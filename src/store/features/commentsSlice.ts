import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { ApiResponse, CommentData, CommentValues } from '../../types/types'
import toast from '../../utils/toast'
import { RootState } from '../store'
import { getPosts } from './postsSlice'

interface CommentResponse extends ApiResponse {
  comment: CommentData
}

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: { postId: number; data: CommentValues }) => {
    const response = await api.post<CommentResponse>(`posts/${postId}/comments`, data)
    return response.data.comment
  }
)

export const editComment = createAsyncThunk(
  'comments/editComment',
  async ({ postId, commentId, data }: { postId: number; commentId: number; data: CommentValues }) => {
    const response = await api.patch<CommentResponse>(`posts/${postId}/comments/${commentId}`, data)
    return { id: commentId, changes: response.data.comment }
  }
)

export const hideComment = createAsyncThunk(
  'comments/hideComment',
  async ({ postId, commentId }: { postId: number; commentId: number }) => {
    const response = await api.patch<CommentResponse>(`posts/${postId}/comments/${commentId}/hide`)
    toast('success', response.data.message)
    return commentId
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, commentId }: { postId: number; commentId: number }) => {
    const response = await api.delete<CommentResponse>(`posts/${postId}/comments/${commentId}`)
    toast('success', response.data.message)
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
