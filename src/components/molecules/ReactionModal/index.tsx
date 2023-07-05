import React, { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'

import { StyledFragmentDialog } from '../AnnouncementModal/styles'
import { reactionIcons } from '../AnnouncementReactions'
import FragmentDialogContent from '../FragmentDialogContent'
import FragmentDialogTitle from '../FragmentDialogTitle'

import {
  Panel,
  Tab,
  Tabs,
  UserReaction,
  UserReactionContent,
  UserReactionFigure,
  UserReactionHeader,
} from './styles'
import { IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import ProfileIcon from '@/components/atoms/ProfileIcon'
import ReactionIcon from '@/components/atoms/ReactionIcon'
import { colors } from '@/theme'
import { useGetEntity } from '@/utils/hooks/useEntity'

const ReactionModal = ({
  reactionsList,
  reactionsByGroup,
  open,
  handleClose,
}: IProps) => {
  const { data: session } = useSession()

  const [value, setValue] = useState('all')
  const { data: reactions } = useGetEntity('reactions')

  const onClose = (_?, reason?) => {
    if (reason !== 'backdropClick') handleClose(reason)
  }

  const selectedReactions = useMemo(
    () => (value === 'all' ? reactionsList : reactionsByGroup[value]),
    [value],
  )

  return (
    <StyledFragmentDialog
      open={open}
      onClose={onClose}
      data-testid="reaction-modal"
    >
      <FragmentDialogTitle onClose={onClose}>Reactions</FragmentDialogTitle>
      <FragmentDialogContent>
        <Tabs>
          <Tab onClick={() => setValue('all')} isActive={value === 'all'}>
            <FragmentText variant="bodySmallBold">ALL</FragmentText>
          </Tab>
          {reactions
            .filter(r => reactionsByGroup[r.name.toLowerCase()])
            .map(({ name, id }) => (
              <Tab
                key={id + name}
                onClick={() => setValue(name.toLowerCase())}
                isActive={value === name.toLowerCase()}
              >
                {reactionIcons[id].sm}
                <FragmentText variant="bodySmall">
                  {reactionsByGroup[name.toLowerCase()].length}
                </FragmentText>
              </Tab>
            ))}
        </Tabs>
        <Panel>
          {selectedReactions
            .sort(r => (r.user.id === Number(session.user.id) ? -1 : 1))
            .map(({ user, id, reaction }) => (
              <UserReaction key={`reaction_modal_${value}_${id}`}>
                <UserReactionFigure>
                  <ProfileIcon
                    size="3em"
                    icon={user.avatar}
                    alt={user.name}
                    objectFit={'cover'}
                  />
                </UserReactionFigure>
                <UserReactionContent>
                  <UserReactionHeader>
                    <>
                      <div>
                        <FragmentText variant="bodySmallBold">
                          {user.name}
                        </FragmentText>
                        <FragmentText
                          color={colors.neutrals.x600}
                          variant="bodyMicro"
                        >
                          {user.jobTitle?.name}
                        </FragmentText>
                      </div>
                    </>
                  </UserReactionHeader>
                  <div>
                    <ReactionIcon>{reactionIcons[reaction.id].sm}</ReactionIcon>
                    <FragmentText variant="bodyXSmall">{`${reaction.name}d`}</FragmentText>
                  </div>
                </UserReactionContent>
              </UserReaction>
            ))}
        </Panel>
      </FragmentDialogContent>
    </StyledFragmentDialog>
  )
}
export default ReactionModal
