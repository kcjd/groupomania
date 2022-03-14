import axios, { AxiosError, AxiosResponse } from 'axios'

import { ApiError, ApiResponse } from '../types/types'
import toast from '../utils/toast'

export const baseURL = import.meta.env.VITE_API_URL as string

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
  (res: AxiosResponse<ApiResponse>) => {
    if (res.data.message) {
      toast('success', res.data.message)
    }
    return res
  },
  (err: AxiosError<ApiError>) => {
    toast('error', err.response?.data.error || 'Le serveur ne répond pas')
  }
)

export default api
