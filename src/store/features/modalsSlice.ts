import { createSlice } from '@reduxjs/toolkit'

interface ModalsState {
  preferences: {
    isOpen: boolean
  }
}

const initialState: ModalsState = {
  preferences: {
    isOpen: false
  }
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openPreferences: (state) => {
      state.preferences.isOpen = true
    },
    closePreferences: (state) => {
      state.preferences.isOpen = false
    }
  }
})

export const { openPreferences, closePreferences } = modalsSlice.actions

export default modalsSlice.reducer
