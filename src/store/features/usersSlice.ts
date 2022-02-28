import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { FollowData, UserData, UserValues } from '../../types/types'
import { RootState } from '../store'
import { logout } from './authSlice'

interface UserDataExtended extends UserData {
  following: FollowData[]
}

export const getUsers = createAsyncThunk<UserDataExtended[]>('users/getUsers', async () => {
  const { data: users } = await api.get('users')
  return users
})

export const editUser = createAsyncThunk<{ id: number; changes: UserData }, { userId: number; data: UserValues }>(
  'users/editUser',
  async ({ userId, data }) => {
    const { data: user } = await api.patch(`users/${userId}`, data)
    return { id: userId, changes: user }
  }
)

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (userId, { dispatch }) => {
  await api.delete(`users/${userId}`)
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
      .addCase(editUser.fulfilled, (state, { payload }) => {
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
