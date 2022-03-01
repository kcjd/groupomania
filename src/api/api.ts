import axios, { AxiosError } from 'axios'

import { ApiError } from '../types/types'
import toast from '../utils/toast'

export const baseURL = 'http://localhost:5500/'

const api = axios.create({
  baseURL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ApiError>) => {
    toast('error', err.response?.data.error || 'Le serveur ne répond pas')
  }
)

export default api
