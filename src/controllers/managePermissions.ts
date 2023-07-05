import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import { PermissionsFormValues } from '@tstypes/permissions'

//#region GET all permissions methods
/**
 * @swagger
 * /api/users/managepermissions:
 *   get:
 *     summary: Get all user permissions
 *     tags:
 *        - Permissions
 *     responses:
 *       '200':
 *         description: Get all user permissions successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPermissionsGetAllPermissions'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getAllPermissions: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data = await getUsersPermissions()
  await prisma.$disconnect()
  res.json(data)
}

const getUsersPermissions = async () => {
  try {
    const data = await prisma.user.findMany({
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
            id: true,
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

//#region POST all permissions methods
/**
 *  @swagger
 *  /api/users/managepermissions:
 *    post:
 *      summary: Update user permissions
 *      tags:
 *        - Permissions
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IPermissionsPostPutRequest'
 *      responses:
 *        '200':
 *          description: The permissions were set successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IPermissionsPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const putUserPermissions: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const reqBody: PermissionsFormValues = req.body
  const data = await putUsersPermissions(reqBody)
  await prisma.$disconnect()
  res.json(data)
}

export const putUsersPermissions = async reqBody => {
  try {
    const { PermissionsArr } = reqBody
    const transaction = await prisma.$transaction(
      PermissionsArr.map(permission => {
        const CurrentDate = new Date()
        const status = !!permission.value
        const user_id = reqBody.userID
        const module_id = Number(permission.key.split('/')[0])
        const action_permission_id = Number(permission.key.split('/')[1])

        return prisma.userModulePermission.upsert({
          where: {
            module_id_action_permission_id_user_id: {
              module_id,
              action_permission_id,
              user_id,
            },
          },
          update: {
            status,
          },
          create: {
            action_permission_id,
            module_id,
            status,
            user_id,
            created_at: CurrentDate,
            updated_at: CurrentDate,
          },
        })
      }),
    )

    return transaction
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion
