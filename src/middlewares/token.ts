import type { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'next-auth/jwt'

import { readToken } from '@/utils/api/tokenManager'

const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next,
) => {
  const userAgent = req.headers['user-agent']
  if (
    req.url === '/api/adp/workers/update' &&
    userAgent === 'Google-Cloud-Scheduler'
  ) {
    next()
    return
  }
  const token: JWT = await readToken(req)
  if (token) {
    next()
  } else {
    res.status(401).json({
      message: 'User not logged in',
      error: 'User not logged in',
    })
  }
}

export default validateToken
