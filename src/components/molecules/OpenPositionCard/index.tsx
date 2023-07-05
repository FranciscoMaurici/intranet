import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import ReadMoreText from '@components/atoms/FragmentReadMore'
import { IconContainer } from '@components/atoms/ProfileIcon/styles'
import CardMenu from '@components/molecules/CardMenu'
import type { ICardMenuItems } from '@components/molecules/CardMenu/types'

import { CardDescription, CardHeaderData } from '../AnnouncementCard/styles'

import {
  PositionCardContainer,
  PositionCardHeader,
  PositionCardHeaderLeft,
} from './styles'
import type { IProps } from './types'

import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import usePermissions from '@/utils/hooks/usePermissions'

const OpenPositionCard = ({
  openPosition,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
  onToggle = () => null,
  isExpanded,
}: IProps) => {
  extend(relativeTime)

  const { userCan } = usePermissions()
  const canViewMenu =
    userCan(DefaultActionPermission.UPDATE, DefaultUserModules.OPENPOSITION) ||
    userCan(DefaultActionPermission.DELETE, DefaultUserModules.OPENPOSITION)

  const menuItems: ICardMenuItems = [
    {
      type: 'edit',
      onClick: handleOpenEditDialog,
      canView: userCan(
        DefaultActionPermission.UPDATE,
        DefaultUserModules.OPENPOSITION,
      ),
    },
    {
      type: 'delete',
      onClick: handleOpenDeleteDialog,
      canView: userCan(
        DefaultActionPermission.DELETE,
        DefaultUserModules.OPENPOSITION,
      ),
    },
  ]

  return (
    <PositionCardContainer>
      <PositionCardHeader>
        <PositionCardHeaderLeft>
          <IconContainer size="2.4em" rightMargin="1em">
            <span>{openPosition.client.substring(0, 2).toUpperCase()}</span>
          </IconContainer>
          <CardHeaderData>
            <h5>
              {openPosition.title.toUpperCase()} AT{' '}
              {openPosition.client.toUpperCase()}
            </h5>
            <p title={dayjs(openPosition.created_at).toString()}>
              {dayjs(openPosition.created_at).fromNow()}
              <span>
                {openPosition.openings}
                {' open '}
                {openPosition.openings > 1 ? 'positions' : 'position'} remaining
              </span>
              <span>ID: {openPosition.position_id}</span>
            </p>
          </CardHeaderData>
        </PositionCardHeaderLeft>
        {canViewMenu && <CardMenu menuItems={menuItems} />}
      </PositionCardHeader>
      <CardDescription>
        <ReadMoreText
          text={openPosition.description}
          onToggle={onToggle}
          isExpanded={isExpanded}
          ariaControl="readMoreText"
        />
      </CardDescription>
    </PositionCardContainer>
  )
}

export default OpenPositionCard
export type { IProps }
