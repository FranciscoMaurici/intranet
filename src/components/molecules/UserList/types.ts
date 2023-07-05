import { SubmitHandler } from 'react-hook-form'

import { PermissionsFormValues } from '@tstypes/permissions'
import { UserState } from '@tstypes/user'

export interface IProps {
  user: UserState
  onSubmit: SubmitHandler<PermissionsFormValues>
}
