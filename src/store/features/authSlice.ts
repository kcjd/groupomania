import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, UserData } from '../../types/types'
import { LoginValues, SignupValues } from '../../utils/validation'
import { RootState } from '../store'
import { selectUserById } from './usersSlice'

interface AuthState {
  user: number | null
}

interface AuthResponse extends ApiResponse {
  user: UserData
  accessToken: string
}

export const signup = createAsyncThunk('auth/signup', async (data: SignupValues) => {
  const response = await api.post<AuthResponse>('auth/signup', data)
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('user', JSON.stringify(response.data.user.id))
  return response.data.user.id
})

export const login = createAsyncThunk('auth/login', async (data: LoginValues) => {
  const response = await api.post<AuthResponse>('auth/login', data)
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('user', JSON.stringify(response.data.user.id))
  return response.data.user.id
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
        state.user = payload
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const selectAuthUser = (state: RootState) => {
  const userId = state.auth.user

  if (!userId) return

  return selectUserById(state, userId)
}

export default authSlice.reducer
