import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { deleteComment } from '@controllers/comments'

import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).delete(deleteComment)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
