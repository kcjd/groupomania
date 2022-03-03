import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Ce champ est requis'
  },
  string: {
    min: ({ min }) => `Minimum ${min} caractères`,
    max: ({ max }) => `Maximum ${max} caractères`,
    email: 'Email non valide'
  }
})

export const signupSchema = yup.object({
  lastname: yup.string().max(30).required(),
  firstname: yup.string().max(30).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).max(20).required()
})

export const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
})

export const postSchema = yup.object({
  content: yup.string().max(255).required()
})

export const commentSchema = yup.object({
  content: yup.string().max(255).required()
})

export const userSchema = yup.object({
  lastname: yup.string().max(30).required(),
  firstname: yup.string().max(30).required(),
  position: yup.string().max(30).nullable()
})

export const passwordSchema = yup.object({
  password: yup.string().required(),
  newPassword: yup.string().min(8).max(20).required()
})

export type SignupValues = yup.InferType<typeof signupSchema>
export type LoginValues = yup.InferType<typeof loginSchema>
export type PostValues = yup.InferType<typeof postSchema>
export type CommentValues = yup.InferType<typeof commentSchema>
export type ProfileValues = yup.InferType<typeof userSchema>
export type PasswordValues = yup.InferType<typeof passwordSchema>
