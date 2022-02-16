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
  picture?: FileList
}

export interface UserData {
  id: number
  lastname: string
  firstname: string
  position?: string
  picture?: string
  role: 'user' | 'moderator'
}

export interface PasswordValues {
  password: string
  newPassword: string
}

export interface PostValues {
  content: string
  media?: FileList
  userId: number
}

export interface PostData {
  id: number
  createdAt: string
  content: string
  media?: string
  userId: number
}

export interface CommentValues {
  content: string
  userId: number
  postId: number
}

export interface CommentData extends CommentValues {
  id: number
  createdAt: string
}

export interface LikeValues {
  userId: number
  postId: number
}

export interface LikeData extends LikeValues {
  id: number
}

export interface FollowValues {
  userId: number
  following: number
}

export interface FollowData extends FollowValues {
  id: number
}
