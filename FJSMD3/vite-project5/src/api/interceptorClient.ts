import axios, { type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from './authToken'

export const interceptorClient = axios.create({
  baseURL: 'http://localhost:3004',
})

export function injectBearerToken(config: InternalAxiosRequestConfig) {
  const token = getAccessToken()

  if (!token) {
    return config
  }

  config.headers.Authorization = `Bearer ${token}`
  return config
}

interceptorClient.interceptors.request.use(injectBearerToken)
