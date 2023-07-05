import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getCelebrations } from '@/controllers/celebrations'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).get(getCelebrations)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
