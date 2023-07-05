export type PermissionsFormValues = {
  '1/1'?: boolean
  '1/2'?: boolean
  '1/3'?: boolean
  '1/4'?: boolean
  '1/5'?: boolean
  '1/6'?: boolean
  '2/1'?: boolean
  '2/2'?: boolean
  '2/3'?: boolean
  '2/4'?: boolean
  '2/5'?: boolean
  '2/6'?: boolean
  '3/1'?: boolean
  '3/2'?: boolean
  '3/3'?: boolean
  '3/4'?: boolean
  '3/5'?: boolean
  '3/6'?: boolean
  '4/1'?: boolean
  '4/2'?: boolean
  '4/3'?: boolean
  '4/4'?: boolean
  '4/5'?: boolean
  '4/6'?: boolean
  '5/1'?: boolean
  '5/2'?: boolean
  '5/3'?: boolean
  '5/4'?: boolean
  '5/5'?: boolean
  '5/6'?: boolean
  '6/1'?: boolean
  '6/2'?: boolean
  '6/3'?: boolean
  '6/4'?: boolean
  '6/5'?: boolean
  '6/6'?: boolean
}

type PFVExtender = {
  disabled?: boolean
  permissionID?: number
  selected?: boolean
}

export type PermissionsFormValuesExtended = {
  '1/1'?: PFVExtender
  '1/2'?: PFVExtender
  '1/3'?: PFVExtender
  '1/4'?: PFVExtender
  '1/5'?: PFVExtender
  '1/6'?: PFVExtender
  '2/1'?: PFVExtender
  '2/2'?: PFVExtender
  '2/3'?: PFVExtender
  '2/4'?: PFVExtender
  '2/5'?: PFVExtender
  '2/6'?: PFVExtender
  '3/1'?: PFVExtender
  '3/2'?: PFVExtender
  '3/3'?: PFVExtender
  '3/4'?: PFVExtender
  '3/5'?: PFVExtender
  '3/6'?: PFVExtender
  '4/1'?: PFVExtender
  '4/2'?: PFVExtender
  '4/3'?: PFVExtender
  '4/4'?: PFVExtender
  '4/5'?: PFVExtender
  '4/6'?: PFVExtender
  '5/1'?: PFVExtender
  '5/2'?: PFVExtender
  '5/3'?: PFVExtender
  '5/4'?: PFVExtender
  '5/5'?: PFVExtender
  '5/6'?: PFVExtender
  '6/1'?: PFVExtender
  '6/2'?: PFVExtender
  '6/3'?: PFVExtender
  '6/4'?: PFVExtender
  '6/5'?: PFVExtender
  '6/6'?: PFVExtender
}

export type CompletePermissionsFormValues = PermissionsFormValues & {
  userID?: number
  initialMappedModulePermissionsWithID?: PermissionsFormValuesExtended
}

export type PermissionsTableStructureType = {
  text?: string
  checkboxIdentifier?: string
}[][]

export type IPermissionsGetPermissionsTable = PermissionsTableStructureType

export type IPermissionsGetAllPermissions = UserState[]

export type IPermissionsPostPutRequest = {
  userID: number
  PermissionsArr: {
    key: keyof PermissionsFormValues
    value: boolean
    id?: number
  }[]
}
export type IPermissionsPostPutResponse = {
  id: number
  module_id: number
  action_permission_id: number
  user_id: number
  status: boolean
  updated_at: string
  created_at: string
}[]
