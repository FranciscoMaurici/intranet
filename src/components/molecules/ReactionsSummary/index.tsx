import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import ReactionModal from '../ReactionModal'

import { ReactionSummaryMessage, ReactionSummarySection } from './styles'
import { IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import ReactionIcon from '@/components/atoms/ReactionIcon'
import { colors } from '@/theme'
import { useGetEntity } from '@/utils/hooks/useEntity'

const ReactionsSummary = ({
  reactionsList,
  reactionsByGroup,
  isComment,
}: IProps) => {
  const { data: session } = useSession()
  const [open, toggleDialog] = useState(false)

  const reactionsSummaryMessage = () => {
    if (!reactionsList.length) return
    if (isComment) return reactionsList.length
    let message = ''
    if (userReaction) {
      if (reactionsList.length === 2) {
        message += ' and someone else'
      } else if (reactionsList.length > 2) {
        message += ` and ${reactionsList.length - 1} others`
      }
    } else if (reactionsList.length === 1) {
      message += `${reactionsList[0].user.name} `
    } else {
      message += `${reactionsList.length} people`
    }

    if (Object.keys(reactionsByGroup).length > 1) {
      message += ' reacted to this'
    } else {
      message += ` ${Object.keys(reactionsByGroup)[0]}d this`
    }
    return message
  }

  const userReaction = reactionsList?.find(
    reaction => reaction.user.id === Number.parseInt(session.user.id),
  )

  const { data: reactions } = useGetEntity('reactions')

  const handleClose = () => {
    toggleDialog(false)
  }
  return (
    <>
      <ReactionSummarySection isComment={isComment}>
        {reactions && reactionsByGroup && (
          <>
            {reactions
              .filter(r => reactionsByGroup[r.name.toLowerCase()])
              .sort((a, b) =>
                reactionsByGroup[a.name.toLowerCase()].length <
                reactionsByGroup[b.name.toLowerCase()].length
                  ? 1
                  : -1,
              )
              .map(reaction => (
                <ReactionIcon key={reaction.id}>
                  <Image
                    src={`/images/svg/reactions/${reaction.icon}`}
                    width={16}
                    height={16}
                    alt={reaction.name}
                  />
                </ReactionIcon>
              ))}

            <ReactionSummaryMessage
              variant="bodyXSmall"
              color={colors.neutrals.x700}
              onClick={() => toggleDialog(true)}
              data-testid="reaction-summary-message"
            >
              {userReaction && !isComment && (
                <FragmentText
                  variant="bodyRegularBold"
                  color={colors.neutrals.x700}
                  as="span"
                >
                  You
                </FragmentText>
              )}
              {reactionsSummaryMessage()}
            </ReactionSummaryMessage>
            {open && (
              <ReactionModal
                open={open}
                handleClose={handleClose}
                reactionsByGroup={reactionsByGroup}
                reactionsList={reactionsList}
              />
            )}
          </>
        )}
      </ReactionSummarySection>
    </>
  )
}

export default ReactionsSummary
