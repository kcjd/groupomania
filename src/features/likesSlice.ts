import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
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

export default likesSlice.reducer
