import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CommentIcon from '@public/images/svg/comments/comment-icon.svg'
import CelebrateIcon from '@public/images/svg/reactions/celebrate.svg'
import CelebrateIconSm from '@public/images/svg/reactions/celebrate-sm.svg'
import CongratulateIcon from '@public/images/svg/reactions/congratulate.svg'
import CongratulateIconSm from '@public/images/svg/reactions/congratulate-sm.svg'
import LikeIcon from '@public/images/svg/reactions/like.svg'
import LikeIconSm from '@public/images/svg/reactions/like-sm.svg'
import LoveIcon from '@public/images/svg/reactions/love.svg'
import LoveIconSm from '@public/images/svg/reactions/love-sm.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Comment from '../Comment'
import ReactionsSummary from '../ReactionsSummary'

import {
  AnnouncementReactionsContainer,
  CommentForm,
  CommentInput,
  CommentsContainer,
  CTAsContainer,
  IconButton,
  ViewAllComments,
  ViewAllCommentsButtonContainer,
} from './styles'
import { IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import FragmentTooltip from '@/components/atoms/FragmentTooltip'
import ProfileIcon from '@/components/atoms/ProfileIcon'
import ReactionCta from '@/components/atoms/ReactionCta'
import { colors } from '@/theme'
import { Mutations } from '@/types'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import { useGetEntity } from '@/utils/hooks/useEntity'

export const reactionIcons = {
  1: { mid: <LikeIcon />, sm: <LikeIconSm /> },
  2: { mid: <CongratulateIcon />, sm: <CongratulateIconSm /> },
  3: { mid: <LoveIcon />, sm: <LoveIconSm /> },
  4: { mid: <CelebrateIcon />, sm: <CelebrateIconSm /> },
}

const AnnouncementReactions = ({
  announcement,
  openAnnouncementModal,
  isOnModal,
}: IProps) => {
  const {
    formState: { isSubmitting },
    control,
    handleSubmit,
    watch,
    resetField,
    setFocus,
  } = useForm({
    mode: 'onChange',
  })
  const { data: session } = useSession()
  const { isLoading, data: reactions } = useGetEntity('reactions')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const {
    id,
    comments = [],
    reaction_announcement,
    reactionsByGroup,
  } = announcement

  const comment = watch('comment')

  const userReaction = reaction_announcement?.find(
    reaction => reaction.user.id === Number.parseInt(session.user.id),
  )

  const [isShowCommentForm, setIsShowCommentForm] = useState(
    comments.length > 0,
  )

  const [isShowSubmitComment, setIsShowSubmitComment] = useState(false)

  const [
    createReactionMutation,
    updateReactionMutation,
    deleteReactionMutation,
    createCommentMutation,
  ] = [
    useAppMutation(
      Mutations.CREATE_ANNOUNCEMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.UPDATE_ANNOUNCEMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.DELETE_ANNOUNCEMENT_REACTION,
      { invisible: true },
      'announcements',
    ),
    useAppMutation(
      Mutations.CREATE_COMMENT,
      {
        onSettled: () => {
          resetField('comment')
          setFocus('comment')
        },
      },
      'announcements',
    ),
  ]

  const onSubmit = async data => {
    if (data.comment === '') return false
    const commentData = {
      announcement_id: id,
      user_id: Number.parseInt(session.user.id),
      content: data.comment,
    }

    return createCommentMutation.mutate(commentData)
  }

  const onReact = reactionId => {
    handleClose()
    if (reactionId === userReaction?.reaction.id) {
      return deleteReactionMutation.mutate({ id: userReaction.id })
    }

    const reactionData = {
      reaction_id: reactionId,
      announcement_id: id,
      user_id: Number.parseInt(session.user.id),
      id: userReaction?.id,
    }

    userReaction
      ? updateReactionMutation.mutate(reactionData)
      : createReactionMutation.mutate(reactionData)
  }

  useEffect(() => {
    if (comments.length === 0 && isShowCommentForm) setFocus('comment')
  }, [isShowCommentForm])

  const showedComments = isOnModal ? comments : comments.slice(-3)

  return (
    <AnnouncementReactionsContainer>
      <ReactionsSummary
        reactionsByGroup={reactionsByGroup}
        reactionsList={reaction_announcement}
      />
      {!isLoading && reactions && (
        <CTAsContainer>
          <FragmentTooltip
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            placement="top-start"
            leaveDelay={500}
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
              label={userReaction ? userReaction.reaction.name + 'd' : 'Like'}
              onClick={() => onReact(userReaction?.reaction.id || 1)}
              active={!!userReaction}
            ></ReactionCta>
          </FragmentTooltip>

          <ReactionCta
            icon={<CommentIcon />}
            label="New Comment"
            onClick={() => {
              setIsShowCommentForm(true)
              setFocus('comment')
            }}
          ></ReactionCta>
        </CTAsContainer>
      )}
      {comments.length > 0 && (
        <CommentsContainer>
          {!isOnModal && comments.length > 3 && (
            <ViewAllCommentsButtonContainer>
              <ViewAllComments onClick={openAnnouncementModal}>
                <Image
                  src={'/images/svg/comments/view-more-icon.svg'}
                  width={13}
                  height={12.5}
                  alt="View More Comments"
                />
                <FragmentText
                  variant="bodyXSmallBold"
                  color={colors.neutrals.x400}
                >
                  View all comments
                </FragmentText>
              </ViewAllComments>
            </ViewAllCommentsButtonContainer>
          )}

          {showedComments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </CommentsContainer>
      )}
      {isShowCommentForm && (
        <CommentForm onSubmit={handleSubmit(onSubmit)}>
          <ProfileIcon
            size="2em"
            icon={session?.user?.image}
            alt={session?.user?.name}
            objectFit={'cover'}
          />
          <CommentInput
            placeholder="Write a comment..."
            onFocus={() => {
              setIsShowSubmitComment(true)
            }}
            onBlur={() => {
              setIsShowSubmitComment(false)
            }}
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(onSubmit)()
              }
            }}
            name="comment"
            control={control}
            defaultValue=""
            disableUnderline
            multiline
          ></CommentInput>
          {isShowSubmitComment && (
            <button type="submit" disabled={!comment || isSubmitting}>
              <SendIcon
                color={
                  !comment || isSubmitting
                    ? colors.brand.main.x300
                    : colors.brand.main.x100
                }
              />
            </button>
          )}
        </CommentForm>
      )}
    </AnnouncementReactionsContainer>
  )
}

const SendIcon = ({ color = colors.neutrals.x900 }: { color: string }) => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 6.99312C12.5004 7.17129 12.4533 7.34635 12.3634 7.50018C12.2735 7.65402 12.1442 7.78104 11.9887 7.86812L1.49435 13.8687C1.34357 13.9542 1.17331 13.9994 0.999978 14C0.840133 13.9997 0.682694 13.961 0.540859 13.8873C0.399025 13.8136 0.276928 13.707 0.184802 13.5763C0.0926772 13.4457 0.0332085 13.2949 0.0113813 13.1366C-0.0104459 12.9782 0.00600458 12.8169 0.0593535 12.6662L1.76873 7.66937C1.78557 7.61994 1.81748 7.57702 1.85996 7.54664C1.90244 7.51626 1.95338 7.49995 2.0056 7.5H6.49998C6.56852 7.50015 6.63636 7.4862 6.69929 7.45903C6.76222 7.43186 6.81889 7.39204 6.86578 7.34204C6.91267 7.29204 6.94878 7.23294 6.97186 7.1684C6.99495 7.10386 7.00452 7.03527 6.99998 6.96687C6.98864 6.8383 6.92915 6.71876 6.83342 6.63218C6.73769 6.54561 6.61279 6.4984 6.48373 6.5H2.00998C1.95783 6.50009 1.90695 6.48387 1.86448 6.45361C1.822 6.42335 1.79005 6.38057 1.7731 6.33125L0.0581035 1.33125C-0.00868246 1.13965 -0.015607 0.932278 0.0382497 0.736657C0.0921063 0.541035 0.204196 0.366424 0.359633 0.236011C0.515071 0.105598 0.706502 0.0255537 0.908506 0.006507C1.11051 -0.0125397 1.31353 0.0303125 1.4906 0.129373L11.9906 6.1225C12.145 6.20946 12.2736 6.3359 12.3631 6.48888C12.4526 6.64186 12.4998 6.81588 12.5 6.99312Z"
      fill={color}
    />
  </svg>
)

export default AnnouncementReactions
