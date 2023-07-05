import { Comment } from '@prisma/client'

import { ICommentReaction, ICommentReactionPreview } from './reactions'
import { IUserPreview } from './user'

export type IComment = Omit<Comment, 'user_id' | 'updated_at' | 'status'> & {
  user: IUserPreview
  reaction_comment?: ICommentReactionPreview[]
  reactionsByGroup?: { [key: string]: ICommentReaction[] }
}

export type ICommentPostRequest = Pick<
  Comment,
  'announcement_id' | 'user_id' | 'content'
>

export type ICommentPostResponse = Comment

export type ICommentDeleteResponse = { message: 'Comment deleted' }
