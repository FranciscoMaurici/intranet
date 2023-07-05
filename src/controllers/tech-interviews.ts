import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import { CandidateAttachmentType } from '@prisma/client'
import {
  IPaginationParams,
  IQueryCondition,
  ITechInterviewGetAllRequest,
  ITechInterviewGetAllResponse,
  WHERE_CLAUSE_OPERATOR,
} from '@tstypes'

import {
  ITechInterviewPostPutRequest,
  ITechInterviewPostPutResponse,
} from '@/types/tech-interviews'
import {
  validateAllFields,
  validateNonEmptyString,
  validatePositiveNumber,
} from '@/utils/api/validator'
import { addQueryParams } from '@/utils/api/whereClauseManager'
import { getPaginate, getSortBy } from '@/utils/pagination'

//#region POST Tech Interview method
/**
 *  @swagger
 *  /api/tech-interviews:
 *    post:
 *      summary: Create a Tech Interview
 *      tags:
 *        - Tech Interview
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ITechInterviewPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Tech Interview was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ITechInterviewPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const postTechInterview = async (
  req: NextApiRequest,
  res: NextApiResponse<ITechInterviewPostPutResponse>,
) => {
  const data: ITechInterviewPostPutRequest = req.body
  const validationFields = [
    { name: 'position.primary_skill_id', validator: validatePositiveNumber },
    {
      name: 'position.primary_skill_seniority_id',
      validator: validatePositiveNumber,
    },
    { name: 'client.name', validator: validateNonEmptyString },
    { name: 'position.job_description', validator: validateNonEmptyString },
    { name: 'position.job_requirements', validator: validateNonEmptyString },
    { name: 'recruiter_id', validator: validatePositiveNumber },
    { name: 'position.bullhorn_id', validator: validatePositiveNumber },
    { name: 'interview_datetime', validator: validateNonEmptyString },
    { name: 'candidate.first_name', validator: validateNonEmptyString },
    { name: 'candidate.last_name', validator: validateNonEmptyString },
    { name: 'candidate.country_id', validator: validateNonEmptyString },
    { name: 'candidate.english_level', validator: validateNonEmptyString },
    { name: 'candidate.email', validator: validateNonEmptyString },
    { name: 'candidate.cv', validator: validateNonEmptyString },
  ]
  const { isValid, errorMessage } = validateAllFields(validationFields, data)

  if (isValid) {
    const techInterview = await createTechInterview(data)
    await prisma.$disconnect()
    res.json(techInterview)
  } else {
    res.status(400).end(errorMessage)
  }
}

const createTechInterview = async (data: ITechInterviewPostPutRequest) => {
  const { position, client, candidate } = data
  const positionSkill = await prisma.positionSkill.findMany({
    where: {
      primary_skill_id: position.primary_skill_id,
      primary_skill_seniority_id: position.primary_skill_seniority_id,
      secondary_skill_id: position.secondary_skill_id,
      secondary_skill_seniority_id: position.secondary_skill_seniority_id,
      is_tech_lead: position.is_tech_lead,
    },
  })

  let name = ''
  if (positionSkill.length === 0) {
    const [primarySkill, primarySeniority, secondarySkill, secondarySeniority] =
      await prisma.$transaction([
        prisma.skill.findUnique({ where: { id: position.primary_skill_id } }),
        prisma.seniority.findUnique({
          where: { id: position.primary_skill_seniority_id },
        }),
        prisma.skill.findUnique({ where: { id: position.secondary_skill_id } }),
        prisma.seniority.findUnique({
          where: { id: position.secondary_skill_seniority_id },
        }),
      ])

    name = [
      primarySkill.name,
      primarySeniority.name,
      secondarySkill?.name,
      secondarySeniority?.name,
    ]
      .filter(Boolean)
      .join(' ')
  }

  const techInterview = await prisma.techInterview.create({
    data: {
      interview_date: new Date(data.interview_datetime),
      comments: data.comments,
      user_tech_interview_recruiter_idTouser: {
        connect: { id: data.recruiter_id },
      },
      user_tech_interview_interviewer_idTouser: {
        connect: { id: data.interviewer_id },
      },
      candidate: {
        create: {
          first_name: candidate.first_name,
          last_name: candidate.last_name,
          email: candidate.email,
          country_id: candidate.country_id,
          english_level: candidate.english_level,
          screening_feedback: candidate.screening_feedback,
          candidate_attachment: {
            create: [
              { url: candidate.cv, type: CandidateAttachmentType.cv },
              candidate.code_test_url && {
                url: candidate.code_test_url,
                type: CandidateAttachmentType.coderbyte,
              },
            ],
          },
        },
      },
      position: {
        connectOrCreate: {
          create: {
            bullhorn_id: position.bullhorn_id,
            title: 'position title',
            job_description: position.job_description,
            requirements: position.job_requirements,
            client: {
              connectOrCreate: {
                create: {
                  name: client.name,
                },
                where: {
                  id: client.id || -1,
                },
              },
            },
            position_skill: {
              connectOrCreate: {
                create: {
                  name: name,
                  primary_skill_id: position.primary_skill_id,
                  primary_skill_seniority_id:
                    position.primary_skill_seniority_id,
                  secondary_skill_id: position.secondary_skill_id,
                  secondary_skill_seniority_id:
                    position.secondary_skill_seniority_id,
                  is_tech_lead: position.is_tech_lead,
                },
                where: {
                  primary_skill_id_primary_skill_seniority_id_secondary_skill_id_secondary_skill_seniority_id_is_tech_lead:
                    {
                      primary_skill_id: position.primary_skill_id,
                      primary_skill_seniority_id:
                        position.primary_skill_seniority_id,
                      secondary_skill_id: position.secondary_skill_id,
                      secondary_skill_seniority_id:
                        position.secondary_skill_seniority_id,
                      is_tech_lead: position.is_tech_lead,
                    },
                },
              },
            },
          },
          where: {
            bullhorn_id: position.bullhorn_id,
          },
        },
      },
    },
  })
  return techInterview
}
//#endregion

//#region Get Tech Interviews methods
/**
 * @swagger
 * /api/tech-interviews:
 *   get:
 *     summary: Get list of tech interview items
 *     tags:
 *        - Tech Interview
 *     responses:
 *       '200':
 *         description: Get tech interview items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ITechInterviewGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getTechInterviews: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ITechInterviewGetAllResponse>,
) => {
  const queryParams: ITechInterviewGetAllRequest = req.query
  const techInterviews = await readTechInterviews(queryParams)
  res.status(200).json(techInterviews)
}

export const readTechInterviews = async (
  queryParams: ITechInterviewGetAllRequest,
) => {
  const pagination: IPaginationParams = {
    pageNum: queryParams.pageNum ? Number(queryParams.pageNum) : 1,
    pageSize: queryParams.pageSize ? Number(queryParams.pageSize) : 100,
  }

  const orderBy = getSortBy(queryParams.orderBy)
  const { skip, take } = getPaginate(pagination)

  const whereClause: IQueryCondition = {
    where: {
      AND: [
        {
          status: { equals: true },
        },
      ],
    },
  }
  addQueryParams(whereClause, WHERE_CLAUSE_OPERATOR.AND, queryParams)

  const total = await prisma.techInterview.count(whereClause)
  pagination.total = total

  const data = await prisma.techInterview.findMany({
    orderBy,
    skip,
    take,
    ...whereClause,
    include: {
      user_tech_interview_interviewer_idTouser: {
        select: {
          id: true,
          name: true,
        },
      },
      position: {
        select: {
          id: true,
          title: true,
        },
      },
      user_tech_interview_recruiter_idTouser: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return { data, pagination }
}
//#endregion

//#region GET all clients methods
/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags:
 *        - Clients
 *     responses:
 *       '200':
 *         description: Get all clients successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IInterviewToolGetClients'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getClients: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data = await fetchClients()
  await prisma.$disconnect()
  res.json(data)
}

const fetchClients = async () => {
  try {
    const data = await prisma.client.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        id: true,
        name: true,
        status: true,
      },
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region GET all countries methods
/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries
 *     tags:
 *        - Countries
 *     responses:
 *       '200':
 *         description: Get all countries successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IInterviewToolGetCountries'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getCountries: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data = await fetchCountries()
  await prisma.$disconnect()
  res.json(data)
}

const fetchCountries = async () => {
  try {
    const data = await prisma.country.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region GET all users methods
/**
 * @swagger
 * /api/tech-interview/users:
 *   get:
 *     summary: Get all interview users
 *     tags:
 *        - Interview tool
 *     parameters:
 *        - name: constant
 *          in: query
 *          schema:
 *            type: string
 *            default: "TECH_INTERVIEW/INTERVIEWER"
 *          description: module constant value
 *          required: true
 *     responses:
 *       '200':
 *         description: Get users successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPermissionsGetAllPermissions'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getUsers: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data = await fetchUsers(req)
  await prisma.$disconnect()
  res.json(data)
}

const fetchUsers = async (req: NextApiRequest) => {
  try {
    const { constant } = req.query
    const data = await prisma.user.findMany({
      where: {
        modulePermission: {
          some: {
            module: {
              constant: String(constant),
            },
            AND: {
              action_permission_id: 5,
              status: true,
            },
          },
        },
      },
      orderBy: [
        {
          email: 'asc',
        },
      ],
      select: {
        id: true,
        email: true,
        name: true,
        last_name: true,
        country: true,
        status: true,
        avatar: true,
        jobTitle: {
          select: {
            name: true,
          },
        },
        modulePermission: {
          select: {
            status: true,
            module: {
              select: {
                id: true,
              },
            },
            actionPermission: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    return data
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion
