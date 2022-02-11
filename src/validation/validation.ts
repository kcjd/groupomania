import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Ce champ est requis'
  },
  string: {
    min: 'Minimum ${min} caractères',
    max: 'Maximum ${max} caractères',
    email: 'Email non valide'
  }
})

export const signupSchema = yup.object({
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})

export const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
})
