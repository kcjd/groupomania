import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import { RootState } from '../app/store'
import { FollowData, UserData, UserValues } from '../types/types'
import { logout } from './authSlice'

interface UserDataExtended extends UserData {
  follows: FollowData[]
}

export const getUsers = createAsyncThunk<UserDataExtended[]>('users/getUsers', async () => {
  const { data: users } = await api.get('users?_embed=follows')
  return users
})

export const editUser = createAsyncThunk<{ id: number; changes: UserData }, { id: number; data: UserValues }>(
  'users/editUser',
  async ({ id, data }) => {
    const { data: user } = await api.patch(`users/${id}`, data)
    return { id, changes: user }
  }
)

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (id, { dispatch }) => {
  await api.delete(`users/${id}`)
  dispatch(logout())
  return id
})

const usersAdapter = createEntityAdapter<UserData>()

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        const users = payload.map(({ follows, ...user }) => user)
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
