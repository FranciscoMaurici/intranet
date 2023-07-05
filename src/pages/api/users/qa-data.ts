import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { QAUserData } from '@/controllers/users'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(QAUserData)

export default router.handler({ onError })
