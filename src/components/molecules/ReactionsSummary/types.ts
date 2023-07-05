import {
  IAnnouncementReaction,
  ICommentReaction,
  ICommentReactionPreview,
} from '@/types/reactions'

export interface IProps {
  reactionsList: ICommentReactionPreview[]
  reactionsByGroup:
    | { [key: string]: IAnnouncementReaction[] }
    | { [key: string]: ICommentReaction[] }
  isComment?: boolean
}
