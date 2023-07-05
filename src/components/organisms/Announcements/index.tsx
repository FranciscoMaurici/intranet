import { useState } from 'react'

import ProfileIcon from '@components/atoms/ProfileIcon'
import AnnouncementCard from '@components/molecules/AnnouncementCard'
import AnnouncementModal from '@components/molecules/AnnouncementModal'
import CardInputContainer from '@components/molecules/CardInputContainer'
import ConfirmDialog from '@components/molecules/ConfirmDialog'

import { CardWrapper, StyledInput } from './styles'
import { IProps } from './types'

import { useAppSelector } from '@/redux/hooks'
import { IAnnouncement, Mutations } from '@/types'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import usePermissions from '@/utils/hooks/usePermissions'

const defaultAnnouncement = {
  content: '',
}

const Announcements = ({ announcements, isLoading }: IProps) => {
  const { showOverlay } = useAppSelector(store => store.app)

  const deleteMutation = useAppMutation(Mutations.DELETE_ANNOUNCEMENT, {
    onSettled: () => handleCloseDeleteDialog(),
  })

  const { userCan } = usePermissions()

  const [open, toggleDialog] = useState(false)
  const [openConfirm, toggleConfirmDialog] = useState(false)

  const [announcement, setAnnouncement] =
    useState<Partial<IAnnouncement>>(defaultAnnouncement)

  const handleClose = () => {
    setAnnouncement(defaultAnnouncement)
    toggleDialog(false)
  }

  const handleOpenEditDialog = (announcement: IAnnouncement) => {
    setAnnouncement(announcement)
    toggleDialog(true)
  }

  const handleOpenDeleteDialog = (announcement: IAnnouncement) => {
    setAnnouncement(announcement)
    toggleConfirmDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setAnnouncement(defaultAnnouncement)
    toggleConfirmDialog(false)
  }

  const handleConfirmDeletion = () => {
    deleteMutation.mutate(announcement)
  }

  return (
    <div data-testid="announcements">
      {userCan(
        DefaultActionPermission.CREATE,
        DefaultUserModules.ANNOUNCEMENT,
      ) && <CreatePostCard openDialog={() => toggleDialog(true)} />}
      {isLoading ? (
        <AnnouncementCard.Skeleton />
      ) : announcements ? (
        announcements.map(announcement => (
          <AnnouncementCard
            announcement={announcement}
            key={announcement.id}
            handleOpenEditDialog={() => handleOpenEditDialog(announcement)}
            handleOpenDeleteDialog={() => handleOpenDeleteDialog(announcement)}
          />
        ))
      ) : null}
      {open && (
        <AnnouncementModal
          open={open}
          handleClose={handleClose}
          announcement={announcement}
          isLoading={showOverlay}
        />
      )}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={handleCloseDeleteDialog}
          handleConfirm={handleConfirmDeletion}
          message={'Do you want to continue with the deletion of the post?'}
          title={'Delete post'}
          isLoading={showOverlay}
        />
      )}
    </div>
  )
}

const CreatePostCard = ({ openDialog }: { openDialog: () => void }) => (
  <CardWrapper>
    <CardInputContainer>
      <ProfileIcon
        size={'3em'}
        icon="/images/distillery-logo-icon.svg"
        alt="Distillery News"
        objectFit="scale-down"
      />
      <StyledInput readOnly placeholder="Create post..." onClick={openDialog} />
    </CardInputContainer>
  </CardWrapper>
)

export default Announcements
