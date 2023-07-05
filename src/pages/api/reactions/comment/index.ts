import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { postCommentReaction } from '@/controllers/reactions'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(middlewareToken).post(postCommentReaction)

export default router.handler({ onError })
