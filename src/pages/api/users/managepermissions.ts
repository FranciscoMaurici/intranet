import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import {
  getAllPermissions,
  putUserPermissions,
} from '@/controllers/managePermissions'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).get(getAllPermissions).post(putUserPermissions)

export default router.handler({ onError })
