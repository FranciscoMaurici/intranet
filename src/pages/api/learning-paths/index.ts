import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getLearningPaths } from '@controllers/learning-paths'

import middlewareToken from '@/middlewares/token'
import middlewareUserPermission from '@/middlewares/userPermission'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken, middlewareUserPermission).get(getLearningPaths)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
