export interface UserData {
  id: number
  lastname: string
  firstname: string
  position?: string
  picture?: string
  role: 'user' | 'moderator'
}

export interface LoginValues {
  email: string
  password: string
}

export interface SignupValues extends LoginValues {
  lastname: string
  firstname: string
}
