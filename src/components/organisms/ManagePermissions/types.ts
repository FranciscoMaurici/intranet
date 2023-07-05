import { UserState } from '@tstypes/user'

export interface IProps {
  users: UserState[] | null
  isLoading: boolean
}
