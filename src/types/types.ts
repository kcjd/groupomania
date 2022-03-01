export interface ApiResponse {
  message: string
}

export interface ApiError {
  error: string
}

export interface LoginValues {
  email: string
  password: string
}

export interface SignupValues extends LoginValues {
  lastname: string
  firstname: string
}

export interface UserValues {
  lastname: string
  firstname: string
  position?: string
  picture?: string
}

export interface UserData extends UserValues {
  id: number
  role: 'USER' | 'MODERATOR'
}

export interface PasswordValues {
  password: string
  newPassword: string
}

export interface PostValues {
  content: string
  media?: string
}

export interface PostData extends PostValues {
  id: number
  createdAt: string
  authorId: number
}

export interface CommentValues {
  content: string
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
