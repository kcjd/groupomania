import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { CommentData, CommentValues } from '../../types/types'
import { RootState } from '../store'
import { getPosts } from './postsSlice'

export const addComment = createAsyncThunk<CommentData, { postId: number; data: CommentValues }>(
  'comments/addComment',
  async ({ postId, data }) => {
    const { data: comment } = await api.post(`posts/${postId}/comments`, data)
    return comment
  }
)

export const editComment = createAsyncThunk<
  { id: number; changes: CommentData },
  { postId: number; commentId: number; data: CommentValues }
>('comments/editComment', async ({ postId, commentId, data }) => {
  const { data: comment } = await api.patch(`posts/${postId}/comments/${commentId}`, data)
  return { id: commentId, changes: comment }
})

export const hideComment = createAsyncThunk<number, { postId: number; commentId: number }>(
  'comments/hideComment',
  async ({ postId, commentId }) => {
    await api.patch(`posts/${postId}/comments/${commentId}/hide`)
    return commentId
  }
)

export const deleteComment = createAsyncThunk<number, { postId: number; commentId: number }>(
  'comments/deleteComment',
  async ({ postId, commentId }) => {
    await api.delete(`posts/${postId}/comments/${commentId}`)
    return commentId
  }
)

const commentsAdapter = createEntityAdapter<CommentData>()

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
      .addCase(hideComment.fulfilled, (state, { payload }) => {
        commentsAdapter.removeOne(state, payload)
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        commentsAdapter.updateOne(state, payload)
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        commentsAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllComments } = commentsAdapter.getSelectors<RootState>(({ comments }) => comments)

export const selectCommentsByPost = (state: RootState, postId: number | undefined) => {
  return selectAllComments(state).filter((comment) => comment.postId === postId)
}

export default commentsSlice.reducer
