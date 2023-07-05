import { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { reactionIcons } from '../AnnouncementReactions'
import { IconButton } from '../AnnouncementReactions/styles'
import ConfirmDialog from '../ConfirmDialog'
import ReactionsSummary from '../ReactionsSummary'

import {
  CommentContainer,
  CommentContent,
  CommentFigure,
  CommentHeader,
  CommentReactionsContainer,
  CommentSection,
} from './styles'
import { IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import FragmentTooltip from '@/components/atoms/FragmentTooltip'
import ProfileIcon from '@/components/atoms/ProfileIcon'
import ReactionCta from '@/components/atoms/ReactionCta'
import { useAppSelector } from '@/redux/hooks'
import { colors } from '@/theme'
import { Mutations } from '@/types'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import { useGetEntity } from '@/utils/hooks/useEntity'

const Comment = ({
  comment: {
    id,
    content,
    user,
    created_at,
    reaction_comment,
    reactionsByGroup,
  },
}: IProps) => {
  const { showOverlay } = useAppSelector(store => store.app)
  const { data: session } = useSession()
  const { isLoading, data: reactions } = useGetEntity('reactions')
  const { avatar, name, jobTitle } = user

  const [
    createReactionMutation,
    updateReactionMutation,
    deleteReactionMutation,
    deleteCommentMutation,
  ] = [
    useAppMutation(
      Mutations.CREATE_COMMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.UPDATE_COMMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.DELETE_COMMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.DELETE_COMMENT,
      {
        onSettled: () => {
          toggleConfirmDialog(false)
        },
      },
      'announcements',
    ),
  ]

  const handleConfirmDeletion = () => {
    deleteCommentMutation.mutate({ id })
  }

  const [openConfirm, toggleConfirmDialog] = useState(false)

  const userReaction = reaction_comment?.find(
    reaction => reaction.user.id === Number.parseInt(session.user.id),
  )

  const onReact = reactionId => {
    if (reactionId === userReaction?.reaction.id) {
      return deleteReactionMutation.mutate({ id: userReaction.id })
    }

    const reactionData = {
      reaction_id: reactionId,
      comment_id: id,
      user_id: Number.parseInt(session.user.id),
      id: userReaction?.id,
    }

    userReaction
      ? updateReactionMutation.mutate(reactionData)
      : createReactionMutation.mutate(reactionData)
  }

  return (
    <>
      <CommentContainer>
        <CommentFigure>
          <ProfileIcon
            size="2em"
            icon={avatar}
            alt={name}
            objectFit={'cover'}
          />
        </CommentFigure>
        <CommentSection>
          <CommentContent>
            <CommentHeader>
              <>
                <div>
                  <FragmentText variant="bodyXSmallBold">{name}</FragmentText>
                  <FragmentText
                    color={colors.neutrals.x600}
                    variant="bodyMicro"
                  >
                    {jobTitle?.name}
                  </FragmentText>
                </div>
                <FragmentText
                  color={colors.neutrals.x400}
                  variant="bodyMicro"
                  title={dayjs(created_at).toString()}
                >
                  {dayjs(created_at).fromNow()}
                </FragmentText>
              </>
            </CommentHeader>
            <FragmentText variant="bodyXSmall" as="pre">
              {content}
            </FragmentText>
          </CommentContent>
          {!isLoading && reactions && (
            <CommentReactionsContainer>
              <FragmentTooltip
                placement="top-start"
                classes={{ popper: 'reactionsPopper' }}
                title={
                  <>
                    {reactions.map(reaction => (
                      <IconButton
                        key={reaction.id}
                        onClick={() => onReact(reaction.id)}
                        active={userReaction?.reaction.id === reaction.id}
                      >
                        {reactionIcons[reaction.id].mid}
                      </IconButton>
                    ))}
                  </>
                }
              >
                <ReactionCta
                  icon={
                    <Image
                      src={`/images/svg/reactions/${
                        userReaction?.reaction.icon || 'like.svg'
                      }`}
                      width={16}
                      height={16}
                      alt={userReaction ? userReaction.reaction.name : 'Like'}
                    />
                  }
                  label={
                    userReaction ? userReaction.reaction.name + 'd' : 'Like'
                  }
                  onClick={() => onReact(userReaction?.reaction.id || 1)}
                  active={!!userReaction}
                ></ReactionCta>
              </FragmentTooltip>

              {(session.user.id as unknown as number) === user.id && (
                <ReactionCta
                  icon={
                    <Image
                      src={'/images/svg/comments/delete-icon.svg'}
                      width={13}
                      height={12}
                      alt="Delete Comment"
                    />
                  }
                  label="Delete Comment"
                  onClick={() => {
                    toggleConfirmDialog(true)
                  }}
                />
              )}
              <ReactionsSummary
                reactionsByGroup={reactionsByGroup}
                reactionsList={reaction_comment}
                isComment
              />
            </CommentReactionsContainer>
          )}
        </CommentSection>
      </CommentContainer>
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={() => toggleConfirmDialog(false)}
          handleConfirm={handleConfirmDeletion}
          message={'Are you sure that you want to delete your comment?'}
          title={'Delete Comment'}
          isLoading={showOverlay}
        />
      )}
    </>
  )
}

export default Comment
