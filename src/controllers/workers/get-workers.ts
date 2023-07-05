import axios from 'axios'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { IAdpWorker } from '@/types'
import {
  ADP_API_URL,
  getCertificatesAgent,
  readAdpToken,
} from '@/utils/api/adp'

const WORKERS_ENDPOINT = `${ADP_API_URL}/hr/v2/workers`
const FILTER_BY_ACTIVE = `workers/workAssignments/assignmentStatus/statusCode/codeValue eq 'A'`

const mapADPWorkerData = workerADP => {
  const {
    person: { legalName, preferredName, birthDate },
  } = workerADP
  const emails = workerADP.businessCommunication.emails
  const email = emails?.length > 0 ? emails[0].emailUri : ''
  const photoUrl =
    workerADP.photos?.length &&
    workerADP.photos[0].links?.length &&
    workerADP.photos[0].links[0].href
  return {
    associateID: workerADP.associateOID,
    workerID: workerADP.workerID.idValue,
    preferredFirstName: preferredName.givenName,
    preferredLastName: preferredName.familyName1,
    legalFirstName: legalName.givenName,
    legalMiddleName: legalName.middleName,
    legalLastName: legalName.familyName1,
    birthDate: birthDate,
    hireDate: workerADP.workerDates.originalHireDate,
    photoUrl,
    email,
  }
}

export const fetchWorkers = async (
  token: string,
  getActive = false,
): Promise<IAdpWorker[]> => {
  const params = {
    $filter: getActive ? FILTER_BY_ACTIVE : undefined,
    $top: 100,
  }
  let allWorkers = [],
    tempWorkers,
    calledTimes = 0

  do {
    const response = await axios.get(WORKERS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: getCertificatesAgent(),
      params: { ...params, $skip: calledTimes * 100 },
    })
    tempWorkers = response.data.workers
    if (tempWorkers) {
      allWorkers = [...allWorkers, ...tempWorkers]
      calledTimes++
    }
  } while (tempWorkers && tempWorkers.length === 100)

  return allWorkers.map(mapADPWorkerData)
}

export const getWorkers: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const shouldGetActiveWorkers =
      req.query.active === 'false' ? false : true /* Defaults to true */
    const adpToken = await readAdpToken(req, res)
    const workers = await fetchWorkers(adpToken, shouldGetActiveWorkers)
    res.json(workers)
  } catch (error) {
    console.error(error)
  }
}
