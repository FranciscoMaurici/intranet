import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getPermissionsTableStructure } from '@/controllers/managePermissionsTable'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).get(getPermissionsTableStructure)

export default router.handler({ onError })
