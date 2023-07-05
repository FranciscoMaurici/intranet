import type { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'next-auth/jwt'

import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { readToken } from '@/utils/api/tokenManager'
import { validateModulePermission } from '@/utils/validateModulePermission'

const getDefaultActionPermission = (method: string) => {
  switch (method) {
    case 'GET':
      return DefaultActionPermission.READ
    case 'POST':
      return DefaultActionPermission.CREATE
    case 'DELETE':
      return DefaultActionPermission.DELETE
    case 'PUT':
      return DefaultActionPermission.UPDATE
    default:
      return DefaultActionPermission.ADMIN_ACCESS
  }
}

const userPermission = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next,
) => {
  const action = getDefaultActionPermission(req.method)

  // separate by "--OR--" to allow for multiple permissions
  const MODULES = {
    announcement: DefaultUserModules.ANNOUNCEMENT,
    announcements: DefaultUserModules.ANNOUNCEMENT,
    benefit: DefaultUserModules.BENEFIT,
    benefits: DefaultUserModules.BENEFIT,
    'open-position': DefaultUserModules.OPENPOSITION,
    'open-positions': DefaultUserModules.OPENPOSITION,
    'learning-paths': DefaultUserModules.LEARNINGPATHS,
    learningPath: DefaultUserModules.LEARNINGPATHS,
    handbook: DefaultUserModules.HANDBOOK,
    'tech-interviews': `${DefaultUserModules.TECH_INTERVIEW_RECRUITER}--OR--${DefaultUserModules.TECH_INTERVIEW_STACK_MANAGER}--OR--${DefaultUserModules.TECH_INTERVIEW_INTERVIEWER}`,
  }

  const getUserModule = () => {
    let path = req.url.split('/')[2]
    path = path.includes('?') ? path.slice(0, path.indexOf('?')) : path
    return MODULES[path]
  }

  const session: JWT = await readToken(req)
  const isActionPermitted = validateModulePermission(
    session,
    getUserModule(),
    action,
  )

  if (isActionPermitted) {
    return next()
  }

  res.status(403).json({
    message: "You don't have the permissions to perform this action",
  })
}

export default userPermission
