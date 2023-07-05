import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState } from '@tstypes/user'

import { AppState } from '@/redux/store'

const initialState: UserState = {
  id: 0,
  email: '',
  name: '',
  lastName: '',
  country: '',
  department: '',
  position: '',
  image: '',
  permissions: {
    announcementView: true,
    announcementCreate: false,
    announcementEdit: false,
    announcementDelete: false,
    positionView: true,
    positionCreate: false,
    positionEdit: false,
    positionDelete: false,
    benefitView: true,
    benefitEdit: false,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetched(state: UserState, action: PayloadAction<UserState>) {
      return action.payload
    },
  },
})

export const selectUser = (state: AppState) => state.user
export const selectPermissions = (state: AppState) => state.user.permissions

export const { userFetched } = userSlice.actions

export default userSlice.reducer
