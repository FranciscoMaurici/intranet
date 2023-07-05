import { Announcement } from '@prisma/client'

import { IComment } from './comments'
import { IPaginationParams } from '.'

export interface IAnnouncement extends Announcement {
  comments?: IComment[]
  reaction_announcement?: IAnnouncementReaction[]
  reactionsByGroup?: { [key: string]: IAnnouncementReaction[] }
}

// Announcement GET all types
export type IAnnouncementGetAllRequest = Partial<
  Pick<Announcement, 'user_id'> & IPaginationParams
>

// export type IAnnouncementGetAllResponse = IEntityGetAllResponse<IAnnouncement>
export type IAnnouncementGetAllResponse = {
  data: Announcement[]
  pagination: IPaginationParams
}

export type IAnnouncementPostPutRequest = Omit<
  Announcement,
  'id' | 'created_at' | 'updated_at'
>

export type IAnnouncementPostPutResponse = Announcement

// Announcement DELETE types
export type IAnnouncementDeleteRequest = Partial<IAnnouncement> // TODO: Correctly type this and adjust the mutations
export type IAnnouncementDeleteResponse = { message: 'Announcement deleted' }
