import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

//#region GET all permissions methods
/**
 * @swagger
 * /api/users/managepermissionsTable:
 *   get:
 *     summary: Get permissions table structure
 *     tags:
 *        - Permissions Table
 *     responses:
 *       '200':
 *         description: Get permissions table structure successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPermissionsGetPermissionsTable'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getPermissionsTableStructure: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data = await getPermissionsTable()
  await prisma.$disconnect()
  res.json(data)
}

const getPermissionsTable = async () => {
  try {
    const actionPermissions = await prisma.actionPermission.findMany({
      select: {
        id: true,
        description: true,
        constant: true,
      },
    })
    const modules = await prisma.module.findMany({
      select: {
        id: true,
        description: true,
        constant: true,
      },
    })

    const headersRow = [
      {
        text: 'Role',
      },
      ...actionPermissions.map(ap => ({ text: ap.constant })),
    ]
    const modulesRows = modules.map(modul => [
      {
        text: modul.description,
      },
      ...actionPermissions.map(ap => ({
        checkboxIdentifier: `${modul.id}/${ap.id}`,
      })),
    ])
    const tableStructure = [headersRow, ...modulesRows]

    return tableStructure
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion
