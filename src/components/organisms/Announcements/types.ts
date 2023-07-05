import { IAnnouncement } from '@/types'

export interface IProps {
  announcements: IAnnouncement[] | null
  isLoading: boolean
}
