export interface LoginFields {
  email: string
  password: string
}

export interface SignupFields extends LoginFields {
  lastname: string
  firstname: string
}
