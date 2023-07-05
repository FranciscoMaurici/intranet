import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IMessageType, MessageSeverity } from '@tstypes'

const name = 'app'

interface AppState {
  showOverlay: boolean
  message: IMessageType
}

const initialState: AppState = {
  showOverlay: false,
  message: null,
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null
    },
    mutationSuccess(
      state,
      action: PayloadAction<{ message: string; invisible?: boolean }>,
    ) {
      state.showOverlay = false
      if (action.payload.invisible) return
      state.message = {
        message: action.payload.message,
        severity: MessageSeverity.SUCCESS,
      }
    },
    mutationStarted(state) {
      state.showOverlay = true
    },
    mutationRejected(state, action: PayloadAction<string>) {
      state.showOverlay = false
      state.message = {
        message: action.payload,
        severity: MessageSeverity.ERROR,
      }
    },
  },
})

export const {
  clearMessage,
  mutationSuccess,
  mutationStarted,
  mutationRejected,
} = appSlice.actions

export default appSlice.reducer
