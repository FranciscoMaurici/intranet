import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import FragmentReadMore from '@components/atoms/FragmentReadMore'
import FragmentSkeleton from '@components/atoms/FragmentSkeleton'
import CardMenu from '@components/molecules/CardMenu'
import type { ICardMenuItems } from '@components/molecules/CardMenu/types'
import UserData from '@components/molecules/UserData'

import AnnouncementReactions from '../AnnouncementReactions'
import FragmentDialogContent from '../FragmentDialogContent'
import FragmentDialogTitle from '../FragmentDialogTitle'
import { extractImagesFromHTML } from '../FragmentEditor/utils'

import {
  AnnouncementCardContainer,
  AnnouncementHeader,
  CardDescription,
  CardHeaderData,
  CardHeaderLeft,
  ProfileIconSkeleton,
  ReadMoreBar,
  ReadMoreGradient,
  ReadMoreText,
  StyledContent,
  StyledContentContainer,
  StyledFragmentDialog,
} from './styles'
import { IProps } from './types'

import LightBox from '@/components/atoms/FragmentLightbox'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import usePermissions from '@/utils/hooks/usePermissions'

const AnnouncementCard = ({
  announcement,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
}: IProps) => {
  extend(relativeTime)

  const { userCan } = usePermissions()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const canViewMenu =
    userCan(DefaultActionPermission.UPDATE, DefaultUserModules.ANNOUNCEMENT) ||
    userCan(DefaultActionPermission.DELETE, DefaultUserModules.ANNOUNCEMENT)

  const menuItems: ICardMenuItems = [
    {
      type: 'edit',
      onClick: handleOpenEditDialog,
      canView: userCan(
        DefaultActionPermission.UPDATE,
        DefaultUserModules.ANNOUNCEMENT,
      ),
    },
    {
      type: 'delete',
      onClick: handleOpenDeleteDialog,
      canView: userCan(
        DefaultActionPermission.DELETE,
        DefaultUserModules.ANNOUNCEMENT,
      ),
    },
  ]

  const cardContent = (
    <>
      <AnnouncementHeader>
        <CardHeaderLeft>
          <UserData
            withName
            uppercaseName
            nameFontSize="0.8em"
            nameFontWeight="700"
            useDistilleryInfo
          >
            <CardHeaderData>
              <p title={dayjs(announcement.created_at).toString()}>
                {dayjs(announcement.created_at).fromNow()}
              </p>
            </CardHeaderData>
          </UserData>
        </CardHeaderLeft>
        {canViewMenu && <CardMenu menuItems={menuItems} />}
      </AnnouncementHeader>
      <CardDescription padding="0 2em">
        <FragmentReadMore
          parseLinks
          text={' '}
          isExpanded={isExpanded}
          ariaControl="readMoreLightbox"
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </CardDescription>
      {announcement.content && (
        <DashboardEditorContent content={announcement.content} />
      )}
      <AnnouncementReactions
        announcement={announcement}
        isOnModal={isOpen}
        openAnnouncementModal={() => setIsOpen(true)}
      />
    </>
  )
  return (
    <>
      <AnnouncementCardContainer data-testid="announcement-card">
        {cardContent}
      </AnnouncementCardContainer>
      <StyledFragmentDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <FragmentDialogTitle
          onClose={() => {
            setIsOpen(false)
          }}
        >
          {'Distillery’s Post'}
        </FragmentDialogTitle>
        <FragmentDialogContent>{cardContent}</FragmentDialogContent>
      </StyledFragmentDialog>
    </>
  )
}

const AnnouncementCardSkeleton = () => (
  <AnnouncementCardContainer>
    <AnnouncementHeader>
      <ProfileIconSkeleton />
      <CardHeaderData>
        <FragmentSkeleton width={120} height={20} />
        <FragmentSkeleton width={80} />
      </CardHeaderData>
    </AnnouncementHeader>
    <FragmentSkeleton variant="rectangular" height={300} />
  </AnnouncementCardContainer>
)

AnnouncementCard.Skeleton = AnnouncementCardSkeleton

export const proseMirrorMaxHeight = 675
const DashboardEditorContent = ({ content }: { content: string }) => {
  const ref = useRef<HTMLDivElement>()
  const [height, setHeight] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const showReadMore = height > proseMirrorMaxHeight && !isExpanded

  useEffect(() => {
    setTimeout(() => {
      const contentHeight = ref.current.offsetHeight
      if (contentHeight > proseMirrorMaxHeight) {
        setIsExpanded(false)
      }
      setHeight(contentHeight)
    }, 50)
  }, [])

  useEffect(() => {
    images.forEach(src => {
      const element = document.querySelector(`img[src="${src}"]`)
      element.addEventListener('click', () => {
        document.getElementById(src).style.display = 'flex'
        document.body.style.overflowY = 'hidden'
      })
    })
  }, [content])

  const images = useMemo<Array<string>>(
    () => (content ? extractImagesFromHTML(content) : []),
    [content],
  )

  return (
    <StyledContentContainer ref={ref}>
      <StyledContent
        $isDashboard
        $isContentExpanded={isExpanded}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {images.map((image, i) => (
        <LightBox
          key={image + i}
          src={image}
          style={{ display: 'none' }}
          handleClose={() => {
            document.getElementById(image).style.display = 'none'
            document.body.style.overflow = 'unset'
          }}
        />
      ))}
      {showReadMore && (
        <ReadMoreGradient>
          <ReadMoreBar onClick={() => setIsExpanded(true)}>
            <ReadMoreText variant="subHeadingSmall">Read More</ReadMoreText>
          </ReadMoreBar>
        </ReadMoreGradient>
      )}
    </StyledContentContainer>
  )
}

export default AnnouncementCard
export type { IProps }
