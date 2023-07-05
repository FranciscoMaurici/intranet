// QA users
type userDataType = {
  avatar: string
  email: string
  name: string
  status: boolean
}

type usersDataType = Array<userDataType>

function createObjectUser(overrides = {}): userDataType {
  return {
    avatar: '',
    email: 'hrbp_intratest_user@distillery.com',
    name: 'HR Business Partner',
    status: true,
    ...overrides,
  }
}

export const usersData: usersDataType = [
  createObjectUser({
    avatar:
      'https://lh3.googleusercontent.com/a/ALm5wu0C7v_hicHCBeMU6h69SLu2kFuHRKjkTBeACLaL=s96-c',
  }),
  createObjectUser({
    avatar: '',
    email: 'rec_intratest_user@distillery.com',
    name: 'Recruitment',
  }),
  createObjectUser({
    avatar:
      'https://lh3.googleusercontent.com/a/ALm5wu28rXOJKkeVyCCqNaVXf1VDeCIEibGzzjYDfe0B=s96-c',
    email: 'sysadmin_intratest_user@distillery.com',
    name: 'System Administration',
  }),
]
// User Permissions
type userModulePermissionType = {
  email: string
  module_id: number
  action_permission_id: number
  user_id: number
}

function createObjectPermission(overrides = {}): userModulePermissionType {
  return {
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 1,
    action_permission_id: 1,
    user_id: null,
    ...overrides,
  }
}

type usersModulePermissionType = Array<userModulePermissionType>

const userModulePermission: usersModulePermissionType = [
  // Human resources - hrbp_intratest_user@distillery.com
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 2,
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 3,
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 5,
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 6,
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 7,
  }),
  createObjectPermission({
    email: 'hrbp_intratest_user@distillery.com',
    module_id: 8,
  }),
  // ??? - rec_intratest_user@distillery.com
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
  }),
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
    module_id: 2,
  }),
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
    module_id: 3,
  }),
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
    module_id: 6,
  }),
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
    module_id: 7,
  }),
  createObjectPermission({
    email: 'rec_intratest_user@distillery.com',
    module_id: 8,
  }),
  // Admin - sysadmin_intratest_user@distillery.com
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 1,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 2,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 3,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 5,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 6,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 7,
    action_permission_id: 5,
  }),
  createObjectPermission({
    email: 'sysadmin_intratest_user@distillery.com',
    module_id: 8,
    action_permission_id: 5,
  }),
]

export const dataByEmail = (
  email: string,
  user_id: number,
): Array<userModulePermissionType> | null =>
  userModulePermission
    .filter(el => el.email == email)
    .map(obj => {
      obj.user_id = user_id
      return obj
    })
