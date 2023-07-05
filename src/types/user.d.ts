import { JobTitle, User } from '@prisma/client'

type Permissions = {
  announcementView: boolean
  announcementCreate: boolean
  announcementEdit: boolean
  announcementDelete: boolean
  positionView: boolean
  positionCreate: boolean
  positionEdit: boolean
  positionDelete: boolean
  benefitView: boolean
  benefitEdit: boolean
}

export interface UserState {
  id?: number
  email?: string
  name?: string
  lastName?: string
  country?: string
  department?: string
  image?: string
  avatar?: string
  position?: string
  status?: boolean
  data?: string
  permissions?: Permissions
  jobTitle?: JobTitle
  modulePermission?: {
    id: number
    module: {
      id: number
    }
    actionPermission: {
      id: number
    }
  }[]
}

export type IUserPreview = Pick<User, 'id' | 'name' | 'avatar'> & {
  jobTitle: Pick<JobTitle, 'name'>
}
