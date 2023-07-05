import { PrismaClient } from '@prisma/client'

import { actionPermissions } from './actionPermissions'
import { modulesItems } from './modules'
import { dataByEmail, usersData } from './qaUsers'

const prisma = new PrismaClient()

async function main() {
  // Adding action permissions data
  for (const action of actionPermissions) {
    await prisma.actionPermission.upsert({
      where: { constant: action.constant },
      update: {},
      create: action,
    })
  }
  // Adding action permissions data
  for (const moduleItem of modulesItems) {
    await prisma.module.upsert({
      where: { constant: moduleItem.constant },
      update: {},
      create: moduleItem,
    })
  }
  // Creating qa users on the table user
  await Promise.all(
    usersData.map(
      async user =>
        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: user,
        }),
    ),
  )
  // Finding the id from table user
  const qaUsers = await prisma.user.findMany({
    where: {
      email: {
        contains: 'intratest_user',
      },
    },
    select: {
      id: true,
      email: true,
    },
  })
  // Adding permissions on the table userModulePermission
  for (const user of qaUsers) {
    const permissions = dataByEmail(user.email, user.id)

    // Delete previous permissions
    await prisma.userModulePermission.deleteMany({
      where: { user_id: user.id },
    })

    Promise.all(
      permissions.map(
        async permission =>
          await prisma.userModulePermission.create({
            data: {
              action_permission_id: permission.action_permission_id,
              module_id: permission.module_id,
              user_id: user.id,
            },
          }),
      ),
    )
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
