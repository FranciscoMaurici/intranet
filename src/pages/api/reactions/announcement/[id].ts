import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import {
  deleteAnnouncementReaction,
  putAnnouncementReaction,
} from '@/controllers/reactions'
import middlewareToken from '@/middlewares/token'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(middlewareToken)
  .delete(deleteAnnouncementReaction)
  .put(putAnnouncementReaction)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
