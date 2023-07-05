import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

import {
  IBenefit404ErrorResponse,
  IBenefitGetAllResponse,
  IBenefitGetByIdResponse,
  IBenefitPutRequest,
  IBenefitPutResponse,
} from '@/types'

//#region API Handler - Get All Benefits
/**
 * @swagger
 * /api/benefits:
 *   get:
 *     summary: Get list of Benefit items
 *     tags:
 *        - Benefit
 *     responses:
 *       '200':
 *         description: Get Benefit items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBenefitGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getBenefits: NextApiHandler = async (
  _,
  res: NextApiResponse<IBenefitGetAllResponse>,
) => {
  const benefits = await prisma.benefit.findMany()
  res.json({ benefits })
}
//#endregion

//#region API Handler - Get Benefit by ID
/**
 * @swagger
 * /api/benefits/{id}:
 *   get:
 *     summary: Get a benefit by id
 *     tags:
 *        - Benefit
 *     parameters:
 *        - $ref: '#/components/parameters/id'
 *     responses:
 *       '200':
 *         description: Get Benefit successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBenefitGetByIdResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         description: Benefit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBenefit404ErrorResponse'
 */ /***/
export const getBenefit: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IBenefitGetByIdResponse | IBenefit404ErrorResponse>,
) => {
  const benefitId = +req.query.id
  const benefit = await getBenefitById(benefitId)
  if (!benefit) {
    res.status(404).json({ message: 'Benefit not found' })
    return
  }
  res.json({ benefit })
}

export const getBenefitById = async (id: number) => {
  const benefit = await prisma.benefit.findUnique({
    where: { id },
  })
  return benefit
}
//#endregion

//#region API Handler - Put Update Benefit
/**
 *  @swagger
 *  /api/benefits/{id}:
 *    put:
 *      summary: Update Benefit item by ID
 *      tags:
 *        - Benefit
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IBenefitPutRequest'
 *      responses:
 *        '200':
 *          description: The Benefit item was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IBenefitPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 *        '404':
 *          description: Benefit not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IBenefit404ErrorResponse'
 */ /***/
export const putBenefit: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IBenefitPutResponse | IBenefit404ErrorResponse>,
) => {
  const benefitId = +req.query.id
  const benefitExist = await validateBenefitExists(benefitId)
  const benefitData: IBenefitPutRequest = req.body

  if (!benefitExist) {
    res.status(404).json({ message: 'Benefit not found' })
    return
  }

  const benefitUpdated = await prisma.benefit.update({
    where: {
      id: benefitId,
    },
    data: {
      ...benefitData,
      updated_at: new Date(),
    },
  })

  res.json({ benefit: benefitUpdated })
}

const validateBenefitExists = async (benefitId: number) => {
  const benefitDataBase = await getBenefitById(benefitId)
  const benefitExist = Boolean(benefitDataBase)
  return benefitExist
}
//#endregion
