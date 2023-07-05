import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import {
  deleteCommentReaction,
  putCommentReaction,
} from '@/controllers/reactions'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(middlewareToken)
  .delete(deleteCommentReaction)
  .put(putCommentReaction)

export default router.handler({ onError })
