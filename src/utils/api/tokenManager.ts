import type { NextApiRequest } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

export const readToken = async (req: NextApiRequest) => {
  const token: JWT = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  return token
}
