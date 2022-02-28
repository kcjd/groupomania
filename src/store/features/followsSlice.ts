import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { FollowData } from '../../types/types'
import { RootState } from '../store'
import { getUsers } from './usersSlice'

export const addFollow = createAsyncThunk<FollowData, number>('follows/addFollow', async (userId) => {
  const { data: follow } = await api.post(`users/${userId}/follows`)
  return follow
})

export const deleteFollow = createAsyncThunk<string, number>('follows/deleteFollow', async (userId) => {
  const { data: follow } = await api.delete(`users/${userId}/follows`)
  return follow.followerId + '-' + follow.followingId
})

const followsAdapter = createEntityAdapter<FollowData>({
  selectId: (follow) => follow.followerId + '-' + follow.followingId
})

export const followsSlice = createSlice({
  name: 'likes',
  initialState: followsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        const follows = payload.map((user) => user.following).flat()
        followsAdapter.addMany(state, follows)
      })
      .addCase(addFollow.fulfilled, (state, { payload }) => {
        followsAdapter.addOne(state, payload)
      })
      .addCase(deleteFollow.fulfilled, (state, { payload }) => {
        followsAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllFollows } = followsAdapter.getSelectors<RootState>(({ follows }) => follows)

export const selectFollowingByUser = (state: RootState, userId: number | undefined) => {
  return selectAllFollows(state).filter((follow) => follow.followerId === userId)
}

export const selectFollowersByUser = (state: RootState, userId: number | undefined) => {
  return selectAllFollows(state).filter((follow) => follow.followingId === userId)
}

export const selectFollow = (state: RootState, userId: number | undefined, following: number | undefined) => {
  return selectAllFollows(state).find((follow) => follow.followerId === userId && follow.followingId === following)
}

export default followsSlice.reducer
