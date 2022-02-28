import axios from 'axios'

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

export default api
