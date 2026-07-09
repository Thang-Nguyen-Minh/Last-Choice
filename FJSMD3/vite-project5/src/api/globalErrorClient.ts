import axios, { type AxiosError } from 'axios'

export type AuthRedirectHandler = (path: string) => void

export const globalErrorClient = axios.create({
  baseURL: 'http://localhost:3004',
})

let redirectHandler: AuthRedirectHandler = () => undefined

export function setAuthRedirectHandler(handler: AuthRedirectHandler) {
  redirectHandler = handler
}

export function handleGlobalApiError(error: AxiosError) {
  if (error.response?.status === 401) {
    redirectHandler('/login')
  }

  return Promise.reject(error)
}

globalErrorClient.interceptors.response.use((response) => response, handleGlobalApiError)
