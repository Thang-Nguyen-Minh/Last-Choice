import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { getAccessToken } from './authToken'

export type ApiException = {
  status: number | null
  message: string
}

export function cleanParams(params?: Record<string, unknown>) {
  if (!params) {
    return undefined
  }

  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

export function createResilientAxiosInstance() {
  const instance = axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 5000,
  })

  instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? null
        const message = status === 401 ? 'Phiên đăng nhập hết hạn' : status === 500 ? 'Máy chủ gặp lỗi' : error.message
        return Promise.reject({ status, message } satisfies ApiException)
      }
      return Promise.reject({ status: null, message: 'Lỗi không xác định' } satisfies ApiException)
    },
  )

  return instance
}

export class ApiClient {
  private readonly instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  get<T>(url: string, params?: Record<string, unknown>) {
    return this.instance.get<T, T>(url, { params: cleanParams(params) })
  }

  post<T>(url: string, data: unknown) {
    return this.instance.post<T, T>(url, data)
  }

  put<T>(url: string, data: unknown) {
    return this.instance.put<T, T>(url, data)
  }

  remove<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T, T>(url, config)
  }
}

export const apiClient = new ApiClient(createResilientAxiosInstance())

export const coveredExceptionScenarios = [
  'Tự động gắn Bearer Token khi có token',
  'Bỏ qua Authorization khi token null',
  'Timeout 5000ms',
  'Response thành công chỉ trả response.data',
  'Chuẩn hóa lỗi 401 và 500',
  'Dọn params undefined/null/chuỗi rỗng trước khi GET',
]
