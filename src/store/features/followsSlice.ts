import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, FollowData } from '../../types/types'
import { RootState } from '../store'
import { getUsers } from './usersSlice'

interface FollowResponse extends ApiResponse {
  follow: FollowData
}

export const addFollow = createAsyncThunk('follows/addFollow', async (userId: number) => {
  const response = await api.post<FollowResponse>(`users/${userId}/follows`)
  return response.data.follow
})

export const deleteFollow = createAsyncThunk('follows/deleteFollow', async (userId: number) => {
  const response = await api.delete<FollowResponse>(`users/${userId}/follows`)
  return response.data.follow
})

const selectId = (follow: FollowData) => follow.followerId + '-' + follow.followingId

const followsAdapter = createEntityAdapter<FollowData>({ selectId })

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
        followsAdapter.removeOne(state, selectId(payload))
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
