import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import { Handbook } from '@prisma/client'

import {
  IHandbookDeleteResponse,
  IHandbookPostPutRequest,
  IHandbookPostPutResponse,
} from '@/types'
import {
  validateAllFields,
  validateNonEmptyString,
  validatePositiveNumber,
  validateZeroOrPositiveNumber,
} from '@/utils/api/validator'

//#region GetAll Handbook methods
/**
 * @swagger
 * /api/handbook:
 *   get:
 *     summary: Get list of Handbook items
 *     tags:
 *        - Handbook
 *     responses:
 *       '200':
 *         description: Get Handbook items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IHandbookGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getHandbook: NextApiHandler = async (_, res: NextApiResponse) => {
  const handbook = await readHandbook()
  res.json(handbook)
}

const sortArticlesByOrder = (a: Handbook, b: Handbook) => a.order - b.order

export const readHandbook = async () => {
  const handbook = await prisma.handbook.findMany({
    where: {
      status: true,
    },
  })

  const parents = handbook
    .filter(item => !item.parent_id)
    .sort(sortArticlesByOrder)

  const arrayToTree = (arr: Handbook[], parent_id: number) =>
    arr
      .filter(item => item.parent_id === parent_id)
      .sort(sortArticlesByOrder)
      .map(child => ({ ...child, children: arrayToTree(arr, child.id) }))

  return parents.map(parent => ({
    ...parent,
    children: arrayToTree(handbook, parent.id),
  }))
}

//#endregion

//#region GetById Handbook methods
/**
 *  @swagger
 *  /api/handbook/{slug}:
 *    get:
 *      summary: Get Handbook item by ID
 *      tags:
 *        - Handbook
 *      parameters:
 *        - $ref: '#/components/parameters/slug'
 *      responses:
 *        '200':
 *          description: The Handbook item was retrieved by ID successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IHandbookGetByIdResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const getHandbookArticle: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const slug = req.query.id
  const handbook = await readHandbookArticle(slug)
  res.json(handbook)
}

export const readHandbookArticle = async slug => {
  const article = await prisma.handbook.findUnique({
    where: {
      slug: slug,
    },
  })

  return article
}
//#endregion

//#region POST Handbook methods
/**
 *  @swagger
 *  /api/handbook:
 *    post:
 *      summary: Create a Handbook item
 *      tags:
 *        - Handbook
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IHandbookPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Handbook item was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IHandbookPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const postHandbook = async (
  req: NextApiRequest,
  res: NextApiResponse<IHandbookPostPutResponse>,
) => {
  const data: IHandbookPostPutResponse = req.body
  const validationFields = [
    { name: 'title', validator: validateNonEmptyString },
    { name: 'order', validator: validatePositiveNumber },
    { name: 'slug', validator: validateNonEmptyString },
    { name: 'level', validator: validateZeroOrPositiveNumber },
  ]
  const { isValid, errorMessage } = validateAllFields(validationFields, data)

  if (isValid) {
    const handbook = await createHandbook(data)
    await prisma.$disconnect()
    res.json(handbook)
  } else {
    res.status(400).end(errorMessage || 'The content field is missing')
  }
}

const createHandbook = async (data: IHandbookPostPutResponse) => {
  const [, handbook] = await prisma.$transaction([
    prisma.$executeRaw`call Intranet_Handbook_PreUpsert(${data.level},${data.order},0,${data.parent_id}, 'INSERT')`,
    prisma.handbook.create({
      data: { ...data, level: Number(data.level) },
    }),
    prisma.$executeRaw`call Intranet_Handbook_UpdateMenuIndex()`,
  ])

  return handbook
}
//#endregion

//#region PUT Handbook methods
/**
 *  @swagger
 *  /api/handbook/{id}:
 *    put:
 *      summary: Update Handbook item by ID
 *      tags:
 *        - Handbook
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IHandbookPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Handbook item was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IHandbookPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const putHandbook: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IHandbookPostPutResponse>,
) => {
  const id = Number(req.query.id)
  const data: IHandbookPostPutRequest = req.body

  const validationFields = [
    { name: 'title', validator: validateNonEmptyString },
    { name: 'order', validator: validatePositiveNumber },
    { name: 'slug', validator: validateNonEmptyString },
    { name: 'level', validator: validateZeroOrPositiveNumber },
  ]
  const { isValid, errorMessage } = validateAllFields(validationFields, data)

  if (isValid) {
    const handbook = await updateHandbook(data, id)
    await prisma.$disconnect()
    res.json(handbook)
  } else {
    res.status(400).end(errorMessage || 'The content field is missing')
  }
}

const updateHandbook = async (data: IHandbookPostPutRequest, id: number) => {
  const newData: IHandbookPostPutRequest = {
    ...data,
    level: Number(data.level),
  }

  const { order } = await prisma.handbook.findUnique({
    where: {
      id: id,
    },
  })

  const [, handbook] = await prisma.$transaction([
    prisma.$executeRaw`call Intranet_Handbook_PreUpsert(${data.level},${
      data.order
    },${order || data.order},${data.parent_id}, 'UPDATE')`,
    prisma.handbook.update({
      where: { id },
      data: newData,
    }),
    prisma.$executeRaw`call Intranet_Handbook_UpdateMenuIndex()`,
  ])

  return handbook
}
//#endregion

//#region DELETE Handbook methods
/**
 *  @swagger
 *  /api/handbook/{id}:
 *    delete:
 *      summary: Delete Handbook item by ID
 *      tags:
 *        - Handbook
 *      description: >-
 *        API to delete a handbook item, this is only a soft delete changing the status
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      responses:
 *        '200':
 *            description: The Handbook item was deleted successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/IHandbookDeleteResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/

export const deleteHandbook: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IHandbookDeleteResponse>,
) => {
  try {
    const id = Number(req.query.id)

    const data = await prisma.handbook.findUnique({
      where: {
        id,
      },
    })

    await prisma.$transaction([
      prisma.$executeRaw`call Intranet_Handbook_PreUpsert(${data.level},${data.order},${data.order},${data.parent_id}, 'DELETE')`,
      prisma.handbook.update({
        where: { id },
        data: {
          status: false,
        },
      }),
      prisma.$executeRaw`call Intranet_Handbook_UpdateMenuIndex()`,
    ])
    res.json({ message: 'Handbook deleted' })
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error.' })
  }
}

//#endregion
