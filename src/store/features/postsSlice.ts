import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'
import {
  ApiResponse, CommentData, LikeData, PostData, PostValues, ReportData
} from '../../types/types'
import toast from '../../utils/toast'
import { RootState } from '../store'

interface PostDataExtended extends PostData {
  comments: CommentData[]
  likes: LikeData[]
  reports: ReportData[]
}

interface PostsReponse extends ApiResponse {
  posts: PostDataExtended[]
}

interface PostReponse extends ApiResponse {
  post: PostData
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await api.get<PostsReponse>('posts')
  return response.data.posts
})

export const addPost = createAsyncThunk('posts/addPost', async (data: PostValues | FormData) => {
  const response = await api.post<PostReponse>('posts', data)
  return response.data.post
})

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, data }: { postId: number; data: PostValues | FormData }) => {
    const response = await api.patch<PostReponse>(`posts/${postId}`, data)
    return { id: postId, changes: response.data.post }
  }
)

export const hidePost = createAsyncThunk('posts/hidePost', async (postId: number) => {
  const response = await api.patch<PostReponse>(`posts/${postId}/hide`)
  toast('success', response.data.message)
  return postId
})

export const deletePostMedia = createAsyncThunk('posts/deletePostMedia', async (postId: number) => {
  const response = await api.delete<PostReponse>(`posts/${postId}/media`)
  toast('success', response.data.message)
  return postId
})

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
  const response = await api.delete<PostReponse>(`posts/${postId}`)
  toast('success', response.data.message)
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
