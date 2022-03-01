import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, LikeData } from '../../types/types'
import { RootState } from '../store'
import { getPosts } from './postsSlice'

interface LikeResponse extends ApiResponse {
  like: LikeData
}

export const addLike = createAsyncThunk('likes/addLike', async (postId: number) => {
  const response = await api.post<LikeResponse>(`posts/${postId}/likes`)
  return response.data.like
})

export const deleteLike = createAsyncThunk('likes/deleteLike', async (postId: number) => {
  const response = await api.delete<LikeResponse>(`posts/${postId}/likes`)
  return response.data.like
})

const selectId = (like: LikeData) => like.userId + '-' + like.postId

const likesAdapter = createEntityAdapter<LikeData>({ selectId })

export const likesSlice = createSlice({
  name: 'likes',
  initialState: likesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        const likes = payload.map((post) => post.likes).flat()
        likesAdapter.addMany(state, likes)
      })
      .addCase(addLike.fulfilled, (state, { payload }) => {
        likesAdapter.addOne(state, payload)
      })
      .addCase(deleteLike.fulfilled, (state, { payload }) => {
        likesAdapter.removeOne(state, selectId(payload))
      })
})

export const { selectAll: selectAllLikes } = likesAdapter.getSelectors<RootState>(({ likes }) => likes)

export const selectLikesByPost = (state: RootState, postId: number | undefined) => {
  return selectAllLikes(state).filter((like) => like.postId === postId)
}

export const selectLike = (state: RootState, postId: number | undefined, userId: number | undefined) => {
  return selectAllLikes(state).find((like) => like.postId === postId && like.userId === userId)
}

export default likesSlice.reducer
