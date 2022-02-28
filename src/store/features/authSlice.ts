import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { LoginValues, SignupValues, UserData } from '../../types/types'
import { RootState } from '../store'

interface AuthState {
  user: UserData | null
}

export interface AuthData {
  user: UserData
  accessToken: string
}

export const signup = createAsyncThunk<AuthData, SignupValues>('auth/signup', async (data) => {
  const response = await api.post<AuthData>('auth/signup', data)
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
})

export const login = createAsyncThunk<AuthData, LoginValues>('auth/login', async (data) => {
  const response = await api.post<AuthData>('auth/login', data)
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
})

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
})

const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: (storedUser && JSON.parse(storedUser)) || null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.user = payload.user
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const selectAuthUser = (state: RootState) => state.auth.user

export default authSlice.reducer