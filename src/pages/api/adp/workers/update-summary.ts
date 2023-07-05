import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getUpdateSummary } from '@/controllers/workers/update-summary'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).get(getUpdateSummary)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
