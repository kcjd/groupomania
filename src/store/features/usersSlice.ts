import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, FollowData, UserData } from '../../types/types'
import { PasswordValues, ProfileValues } from '../../utils/validation'
import { RootState } from '../store'
import { logout } from './authSlice'

interface UserDataExtended extends UserData {
  following: FollowData[]
}

interface UsersResponse extends ApiResponse {
  users: UserDataExtended[]
}

interface UserResponse extends ApiResponse {
  user: UserData
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await api.get<UsersResponse>('users')
  return response.data.users
})

export const editProfile = createAsyncThunk(
  'users/editProfile',
  async ({ userId, data }: { userId: number; data: ProfileValues | FormData }) => {
    const response = await api.patch<UserResponse>(`users/${userId}`, data)
    return { id: userId, changes: response.data.user }
  }
)

export const editPassword = createAsyncThunk(
  'users/editPassword',
  async ({ userId, data }: { userId: number; data: PasswordValues }) => {
    await api.patch<UserResponse>(`users/${userId}/password`, data)
  }
)

export const deleteUserPicture = createAsyncThunk('users/deleteUserPicture', async (userId: number) => {
  const response = await api.delete<UserResponse>(`users/${userId}/picture`)
  return { id: userId, changes: response.data.user }
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number, { dispatch }) => {
  await api.delete<UserResponse>(`users/${userId}`)
  dispatch(logout())
  return userId
})

const usersAdapter = createEntityAdapter<UserData>()

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        const users = payload.map(({ following, ...user }) => user)
        usersAdapter.setAll(state, users)
      })
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        usersAdapter.updateOne(state, payload)
      })
      .addCase(deleteUserPicture.fulfilled, (state, { payload }) => {
        usersAdapter.updateOne(state, payload)
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        usersAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors<RootState>(
  ({ users }) => users
)

export default usersSlice.reducer
