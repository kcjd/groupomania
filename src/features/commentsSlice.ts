import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import { CommentData, CommentValues } from '../types/types'
import { getPosts } from './postsSlice'

export const addComment = createAsyncThunk<CommentData, CommentValues>('comments/addComment', async (data) => {
  const { data: comment } = await api.post('comments', data)
  return comment
})


export const editComment = createAsyncThunk<{ id: number; changes: CommentData }, { id: number; data: CommentValues }>(
  'comments/editComment',
  async ({ id, data }) => {
    const { data: comment } = await api.patch(`comments/${id}`, data)
    return { id, changes: comment }
  }
)

export const deleteComment = createAsyncThunk<number, number>('comments/deleteComment', async (id) => {
  await api.delete(`comments/${id}`)
  return id
})

const commentsAdapter = createEntityAdapter<CommentData>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() + new Date(a.createdAt).getTime()
})

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        const comments = payload.map((post) => post.comments).flat()
        commentsAdapter.addMany(state, comments)
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        commentsAdapter.addOne(state, payload)
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        commentsAdapter.updateOne(state, payload)
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        commentsAdapter.removeOne(state, payload)
      })
})

export default commentsSlice.reducer
