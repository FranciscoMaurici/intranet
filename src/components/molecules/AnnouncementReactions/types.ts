import { IAnnouncement } from '@/types'

export type IProps = {
  announcement: IAnnouncement
  openAnnouncementModal: () => void
  isOnModal: boolean
}
