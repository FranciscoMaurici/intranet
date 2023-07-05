import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import prisma from '@prisma'
import { User as IUser } from '@prisma/client'

import { fetchWorkers } from './get-workers'

import { createUserPermissions } from '@/pages/api/users/permissions'
import { IAdpWorker } from '@/types'
import { chunk } from '@/utils'
import {
  ADP_API_URL,
  getWorkerNameFormatted,
  getWorkerPhoto,
  readAdpToken,
} from '@/utils/api/adp'

const mapWorkerToUser = (worker, exists: boolean) => ({
  name: !exists ? getWorkerNameFormatted(worker) : undefined,
  email: !exists ? worker.email.toLowerCase() : undefined,
  birth_date: new Date(worker.birthDate),
  hire_date: new Date(worker.hireDate),
  worker_id: worker.workerID,
  associate_id: worker.associateID,
  first_name: worker.preferredFirstName || worker.legalFirstName,
  middle_name: worker.legalMiddleName,
  last_name: worker.preferredLastName || worker.legalLastName,
  status: true,
  avatar: !exists ? '' : undefined,
  avatar_file: worker.photoData || undefined,
})

const updateUser = async (dbUser: IUser, worker: IAdpWorker) =>
  prisma.user.update({
    where: { id: dbUser.id },
    data: mapWorkerToUser(worker, true),
  })

const createUser = async (worker: IAdpWorker) =>
  prisma.user.create({
    data: mapWorkerToUser(worker, false),
  })

export const getCreateWorkersPromises = async (
  workers: IAdpWorker[],
  token: string,
) => {
  // Main purpose of this function is to retrieve the workers photos as efficiently as possible
  // consulting them in batches. After all workers photos have been retrieved,
  // we return the final promises containing the queries to create the Workers in the DB
  const createUserPromises = []

  const batchSize = 48 // number of workers to process in each batch
  const workerBatches = chunk(workers, batchSize) // split workers into batches of batchSize

  for (const workerBatch of workerBatches) {
    const photosPromises: Promise<Buffer | null>[] = []

    for (const worker of workerBatch) {
      photosPromises.push(
        worker.photoUrl
          ? getWorkerPhoto(ADP_API_URL + worker.photoUrl, token)
          : Promise.resolve(null),
      )
    }

    const photos = await Promise.all(photosPromises)
    createUserPromises.push(
      ...workerBatch.map((w, idx) =>
        createUser({ ...w, photoData: photos[idx] }),
      ),
    )
  }

  return createUserPromises
}

const getUsersDeactivationPromises = (
  users: IUser[],
  workers: IAdpWorker[],
) => {
  const excludedUsers = [
    'intranet.media@distillery.com',
    'hrbp_intratest_user@distillery.com',
    'sysadmin_intratest_user@distillery.com',
    'rec_intratest_user@distillery.com',
  ]

  const usersToDeactivate = users.filter(
    u =>
      !workers.find(w => w.email === u.email) &&
      !excludedUsers.includes(u.email),
  )

  return usersToDeactivate.map(u =>
    prisma.user.update({
      where: { id: u.id },
      data: { status: false },
    }),
  )
}

export const updateWorkersData: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const started_at = new Date()
  const token = await readAdpToken(req, res)

  const [workers, users] = await Promise.all([
    fetchWorkers(token, true),
    prisma.user.findMany(),
  ])

  const workersToCreate = [],
    workersToUpdate = []

  workers.forEach(w =>
    users.find(u => w.email.toLowerCase() === u.email.toLowerCase())
      ? workersToUpdate.push(w)
      : workersToCreate.push(w),
  )

  try {
    // Update all existing users
    const updateResults = await Promise.all(
      workersToUpdate.map(worker =>
        updateUser(
          users.find(
            user => worker.email.toLowerCase() === user.email.toLowerCase(),
          ),
          worker,
        ),
      ),
    )

    // Deactivate users
    const deactivationResults = await Promise.all(
      getUsersDeactivationPromises(users, workers),
    )

    // Retrieve create workers promises with their photos
    const createWorkerPromises = await getCreateWorkersPromises(
      workersToCreate,
      token,
    )
    // Create new users
    const createResults = await Promise.all(createWorkerPromises)

    // Populate permissions for all the new users
    await Promise.all(createResults.map(u => createUserPermissions(u.id)))

    let executed_by
    if (req.headers['user-agent'] === 'Google-Cloud-Scheduler') {
      executed_by = users.find(
        u => u.email === 'intranet.media@distillery.com',
      )?.id
    } else {
      const { userData } = await getToken({ req })
      executed_by = (userData as IUser)?.id
    }

    // Store the update date
    const updateRegistry = await prisma.workersUpdateDates.create({
      data: { started_at, executed_by },
    })

    res.json({
      message: `The workers' data was updated successfully`,
      updateDate: updateRegistry.finished_at,
      numberOfUserRowsAffected:
        updateResults.length +
        createResults.length +
        deactivationResults.length,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}
