import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

import prisma from '@prisma'
import { ActionPermission } from '@prisma/client'
import { UserState } from '@tstypes/user'
import { objKeysToCamelCase } from '@utils'

import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (token) {
      if (req.method === 'GET') {
        try {
          const user = await getUserData(token)
          res.json({ user })
        } catch (error) {
          res.status(400).json({
            message: 'Error getting user permissions',
            error: error.message ?? error,
          })
        }
      } else if (req.method === 'POST') {
        try {
          const user = await createUser(token)
          res.json({ user })
        } catch (error) {
          res.status(400).json({
            message: 'Error creating user permissions',
            error: error.message ?? error,
          })
        }
      } else {
        res.status(405).json({
          message: 'Method not supported',
          error: 'Method not supported',
        })
      }
    } else {
      res.status(401).json({
        message: 'User not logged in',
        error: 'User not logged in',
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error getting user token',
      error: error.message ?? error,
    })
  }
}

export const getUserData = async (token: JWT) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        last_name: true,
        country: true,
        modulePermission: {
          select: {
            module: {
              select: {
                description: true,
                constant: true,
                path: true,
                menu: true,
              },
            },
            actionPermission: {
              select: {
                id: true,
                description: true,
                constant: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return await createUser(token)
    }

    const modulesPermission = {}

    user.modulePermission.forEach(module => {
      modulesPermission[module.module.menu] = {
        ...modulesPermission[module.module.menu],
        [module.module.constant]: { 0: module },
      }
    })

    user.modulePermission = modulesPermission as []

    return objKeysToCamelCase<UserState>(user)
  } catch (error) {
    throw new Error(error)
  }
}

const findModulesToAttach = () =>
  prisma.module.findMany({
    where: {
      constant: {
        in: [
          DefaultUserModules.ANNOUNCEMENT,
          DefaultUserModules.BENEFIT,
          DefaultUserModules.OPENPOSITION,
          DefaultUserModules.LEADS,
        ],
      },
    },
    select: {
      id: true,
    },
  })

const findDefaultActions = async (): Promise<Pick<ActionPermission, 'id'>[]> =>
  prisma.actionPermission.findMany({
    where: {
      constant: {
        in: [DefaultActionPermission.READ],
      },
    },
    select: {
      id: true,
    },
  })

export const createUserPermissions = async (userId: number) => {
  const userModules = await findModulesToAttach()
  const permissionArray = await findDefaultActions()

  if (userModules.length && permissionArray.length) {
    const userModulePermission = []
    for (const permission of permissionArray) {
      for (const userModule of userModules || []) {
        userModulePermission.push({
          action_permission_id: permission.id,
          module_id: userModule.id,
          user_id: userId,
        })
      }
    }

    return prisma.userModulePermission.createMany({
      data: userModulePermission,
    })
  } else {
    throw new Error(
      'Modules nor permissions found to assign, contact the admin',
    )
  }
}

const createUser = async (token: JWT) => {
  const email = token.email

  const exists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (exists) {
    throw new Error('User already exists')
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        name: token.name,
        avatar: token.picture,
      },
    })

    await createUserPermissions(newUser.id)

    return objKeysToCamelCase<UserState>({
      ...newUser,
      updated_at: undefined,
      created_at: undefined,
      status: undefined,
      permissions: {
        role_id: undefined,
        user_id: undefined,
        user_email: undefined,
        created_at: undefined,
        updated_at: undefined,
      },
    })
  }
}

export default handler
