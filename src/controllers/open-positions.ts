import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import {
  IOpenPositionDeleteResponse,
  IOpenPositionGetAllRequest,
  IOpenPositionGetAllResponse,
  IOpenPositionPostPutRequest,
  IOpenPositionPostPutResponse,
  IPaginationParams,
  IQueryCondition,
  WHERE_CLAUSE_OPERATOR,
} from '@tstypes'

import { validateFields } from '@/utils/api/validator'
import { addQueryParams } from '@/utils/api/whereClauseManager'
import { getPaginate, getSortBy } from '@/utils/pagination'

const requiredFields = [
  'title',
  'client',
  'openings',
  'description',
  'position_id',
]

//#region GET Open Positions methods
/**
 * @swagger
 * /api/open-positions:
 *   get:
 *     summary: Get list of Open Position items
 *     tags:
 *        - Open Position
 *     responses:
 *       '200':
 *         description: Get Open Position items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IOpenPositionGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getOpenPositions: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOpenPositionGetAllResponse>,
) => {
  const queryParams: IOpenPositionGetAllRequest = req.query
  const openPositions = await readOpenPositions(queryParams)
  res.json(openPositions)
}

const readOpenPositions = async (queryParams: IOpenPositionGetAllRequest) => {
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
          is_open: { equals: true },
        },
      ],
    },
  }

  addQueryParams(
    whereClause,
    WHERE_CLAUSE_OPERATOR.AND,
    queryParams,
    'title',
    'client',
    'description',
  )

  const total = await prisma.openPosition.count(whereClause)
  pagination.total = total

  const data = await prisma.openPosition.findMany({
    orderBy,
    skip,
    take,
    ...whereClause,
  })

  return { data, pagination }
}
//#endregion

//#region Post position methods
/**
 *  @swagger
 *  /api/open-positions:
 *    post:
 *      summary: Create a Open Position item
 *      tags:
 *        - Open Position
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IOpenPositionPostPutRequest'
 *      responses:
 *        '200':
 *          description: The OpenPosition item was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IOpenPositionPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const postOpenPosition: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOpenPositionPostPutResponse>,
) => {
  const data: IOpenPositionPostPutRequest = req.body

  const { isValid, errorMsg } = validateFields(requiredFields, data)
  if (!isValid) res.status(400).end(errorMsg)

  try {
    const openPosition = await createOpenPosition(data)
    await prisma.$disconnect()
    res.json(openPosition)
  } catch (error) {
    throw new Error(error)
  }
}

const createOpenPosition = async (data: IOpenPositionPostPutRequest) =>
  await prisma.openPosition.create({
    data,
  })
//#endregion

//#region PUT Open Position methods
/**
 *  @swagger
 *  /api/open-positions/{id}:
 *    put:
 *      summary: Update Open Position item by ID
 *      tags:
 *        - Open Position
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IOpenPositionPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Open Position item was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IOpenPositionPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const putOpenPosition: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOpenPositionPostPutResponse>,
) => {
  const id = Number(req.query.id)
  const data: IOpenPositionPostPutRequest = req.body

  const { isValid, errorMsg } = validateFields(requiredFields, data)
  if (!isValid) res.status(400).end(errorMsg)

  const openPosition = await updateOpenPosition(data, id)
  await prisma.$disconnect()
  res.json(openPosition)
}

const updateOpenPosition = async (
  data: IOpenPositionPostPutRequest,
  id: number,
) =>
  await prisma.openPosition.update({
    where: { id },
    data,
  })
//#endregion

//#region DELETE Open Position methods
/**
 *  @swagger
 *  /api/open-positions/{id}:
 *    delete:
 *      summary: Delete Open Position item by ID
 *      tags:
 *        - Open Position
 *      description: >-
 *        API to delete an open position item, this is only a soft delete changing the status
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      responses:
 *        '200':
 *            description: The Open Position item was deleted successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/IOpenPositionDeleteResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const deleteOpenPosition: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOpenPositionDeleteResponse>,
) => {
  const id = Number(req.query.id)
  await prisma.openPosition.update({
    where: { id },
    data: {
      is_open: false,
    },
  })
  res.json({ message: 'Open position deleted' })
}
//#endregion
