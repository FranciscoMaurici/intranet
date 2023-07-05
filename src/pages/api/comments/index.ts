import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { postComment } from '@/controllers/comments'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).post(postComment)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
