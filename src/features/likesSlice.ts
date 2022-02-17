import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import { RootState } from '../app/store'
import { LikeData, LikeValues } from '../types/types'
import { getPosts } from './postsSlice'

export const addLike = createAsyncThunk<LikeData, LikeValues>('likes/addLike', async (data) => {
  const { data: like } = await api.post('likes', data)
  return like
})

export const deleteLike = createAsyncThunk<number, number>('likes/deleteLike', async (id) => {
  await api.delete(`likes/${id}`)
  return id
})

const likesAdapter = createEntityAdapter<LikeData>()

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
        likesAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllLikes } = likesAdapter.getSelectors<RootState>(({ likes }) => likes)

export const selectLikesByPost = (state: RootState, postId: number | undefined) => {
  return selectAllLikes(state).filter((like) => like.postId === postId)
}

export const selectLike = (state: RootState, postId: number | undefined, userId: number | undefined) => {
  return selectAllLikes(state).find((like) => like.postId === postId && like.userId == userId)
}

export default likesSlice.reducer
