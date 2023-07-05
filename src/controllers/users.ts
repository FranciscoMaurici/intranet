import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

export const QAUserData: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (!req.body.email) {
    res.status(400).json({ message: 'Email is required' })
  }

  const userData = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  })

  if (!userData) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  const { id, name, email } = userData

  res.json({ id, name, email })
}
