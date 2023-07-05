import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { updateWorkersData } from '@/controllers/workers/update-workers'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).post(updateWorkersData)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
