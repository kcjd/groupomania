import { CommentValues, PostValues, ProfileValues } from '../utils/validation'

export interface ApiResponse {
  message: string
}

export interface ApiError {
  error: string
}

export interface UserData extends ProfileValues {
  id: number
  picture?: string
  role: 'USER' | 'MODERATOR'
}

export interface PostData extends PostValues {
  id: number
  createdAt: string
  media?: string
  authorId: number
}

export interface CommentData extends CommentValues {
  id: number
  createdAt: string
  postId: number
  authorId: number
}

export interface LikeData {
  userId: number
  postId: number
}

export interface ReportData {
  userId: number
  postId: number
}

export interface FollowData {
  followerId: number
  followingId: number
}
