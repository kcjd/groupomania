import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import { CommentData, LikeData, PostData, PostValues } from '../types/types'

interface PostDataExtended extends PostData {
  comments: CommentData[]
  likes: LikeData[]
}

export const getPosts = createAsyncThunk<PostDataExtended[]>('posts/getPosts', async () => {
  const { data: posts } = await api.get('posts?_embed=comments&_embed=likes')
  return posts
})

export const addPost = createAsyncThunk<PostData, PostValues>('posts/addPost', async (data) => {
  const { data: post } = await api.post('posts', data)
  return post
})

export const editPost = createAsyncThunk<{ id: number; changes: PostData }, { id: number; data: PostValues }>(
  'posts/editPost',
  async ({ id, data }) => {
    const { data: post } = await api.patch(`posts/${id}`, data)
    return { id, changes: post }
  }
)

export const deletePost = createAsyncThunk<number, number>('posts/deletePost', async (id) => {
  await api.delete(`posts/${id}`)
  return id
})

export const postsAdapter = createEntityAdapter<PostData>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        const posts = payload.map(({ comments, likes, ...post }) => post)
        postsAdapter.addMany(state, posts)
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        postsAdapter.addOne(state, payload)
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        postsAdapter.updateOne(state, payload)
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postsAdapter.removeOne(state, payload)
      })
})

export default postsSlice.reducer
