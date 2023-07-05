import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getBenefit, putBenefit } from '@controllers/benefits'

import middlewareToken from '@/middlewares/token'
import middlewareUserPermission from '@/middlewares/userPermission'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(middlewareToken, middlewareUserPermission)
  .put(putBenefit)
  .get(getBenefit)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
