import { Reaction, ReactionAnnouncement, ReactionComment } from '@prisma/client'

import { IAnnouncement } from './announcements'
import { IComment } from './comments'
import { IUserPreview } from './user'

export type ICommentReactionPreview = Pick<ReactionComment, 'id' | 'status'> & {
  reaction: IReactionPreview
  user: IUserPreview
}

export type IReactionPreview = Pick<Reaction, 'id' | 'name' | 'icon'>

export interface IUserReaction {
  id: number
  reaction: Reaction
  status: boolean
  created_at: Date
  updated_at: Date
  user: IUserPreview
}

export interface IAnnouncementReaction extends IUserReaction {
  announcement: IAnnouncement
}

export interface ICommentReaction extends IUserReaction {
  comment: IComment
}

export type IReactionGetAllResponse = Reaction[]

// Reaction Announcement Types
export type IReactionAnnouncementPostPutRequest = Omit<
  ReactionAnnouncement,
  'id' | 'created_at' | 'updated_at' | 'status'
>

export type IReactionAnnouncementPostPutResponse = ReactionAnnouncement

export type IReactionAnnouncementDeleteResponse = {
  message: 'Reaction Announcement deleted'
}

// Reaction Comment Types
export type IReactionCommentPostPutRequest = Omit<
  ReactionComment,
  'id' | 'created_at' | 'updated_at' | 'status'
>

export type IReactionCommentPostPutResponse = ReactionComment

export type IReactionCommentDeleteResponse = {
  message: 'Reaction Comment deleted'
}
