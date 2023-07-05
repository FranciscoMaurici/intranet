import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { getAnnouncements, postAnnouncement } from '@controllers/announcements'

import middlewareToken from '@/middlewares/token'
import middlewareUserPermission from '@/middlewares/userPermission'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(middlewareToken, middlewareUserPermission)
  .get(getAnnouncements)
  .post(postAnnouncement)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
