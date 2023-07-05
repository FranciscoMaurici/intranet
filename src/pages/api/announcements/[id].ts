import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { deleteAnnouncement, putAnnouncement } from '@controllers/announcements'

import middlewareToken from '@/middlewares/token'
import middlewareUserPermission from '@/middlewares/userPermission'
import { onError } from '@/utils/api/errorHandler'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(middlewareToken, middlewareUserPermission)
  .put(putAnnouncement)
  .delete(deleteAnnouncement)

export default router.handler({ onError })

export const config = {
  api: {
    externalResolver: true,
  },
}
