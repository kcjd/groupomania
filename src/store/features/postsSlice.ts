import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import { CommentData, LikeData, PostData, PostValues, ReportData } from '../../types/types'
import { RootState } from '../store'

interface PostDataExtended extends PostData {
  comments: CommentData[]
  likes: LikeData[]
  reports: ReportData[]
}

export const getPosts = createAsyncThunk<PostDataExtended[]>('posts/getPosts', async () => {
  const { data: posts } = await api.get('posts')
  return posts
})

export const addPost = createAsyncThunk<PostData, PostValues | FormData>('posts/addPost', async (data) => {
  const { data: post } = await api.post('posts', data)
  return post
})

export const editPost = createAsyncThunk<
  { id: number; changes: PostData },
  { postId: number; data: PostValues | FormData }
>('posts/editPost', async ({ postId, data }) => {
  const { data: post } = await api.patch(`posts/${postId}`, data)
  return { id: postId, changes: post }
})

export const hidePost = createAsyncThunk<number, number>('posts/hidePost', async (postId) => {
  await api.patch(`posts/${postId}/hide`)
  return postId
})

export const deletePostMedia = createAsyncThunk<number, number>('posts/deletePostMedia', async (postId) => {
  await api.delete(`posts/${postId}/media`)
  return postId
})

export const deletePost = createAsyncThunk<number, number>('posts/deletePost', async (postId) => {
  await api.delete(`posts/${postId}`)
  return postId
})

export const postsAdapter = createEntityAdapter<PostData>()

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        const posts = payload.map(({ comments, likes, reports, ...post }) => post)
        postsAdapter.addMany(state, posts)
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        postsAdapter.addOne(state, payload)
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        postsAdapter.updateOne(state, payload)
      })
      .addCase(hidePost.fulfilled, (state, { payload }) => {
        postsAdapter.removeOne(state, payload)
      })
      .addCase(deletePostMedia.fulfilled, (state, { payload }) => {
        postsAdapter.updateOne(state, { id: payload, changes: { media: undefined } })
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postsAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllPosts } = postsAdapter.getSelectors<RootState>(({ posts }) => posts)

export const selectPostsByUser = (state: RootState, userId: number | undefined) => {
  return selectAllPosts(state).filter((post) => post.authorId === userId)
}

export default postsSlice.reducer
