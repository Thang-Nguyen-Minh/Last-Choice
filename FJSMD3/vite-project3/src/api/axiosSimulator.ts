import { useBoundStore } from '../stores/boundStore'

export type RequestConfig = {
  url: string
  headers?: Record<string, string>
}

export function attachAuthHeader(config: RequestConfig): RequestConfig {
  const token = useBoundStore.getState().auth.token

  if (!token) {
    return {
      ...config,
      headers: { ...(config.headers ?? {}) },
    }
  }

  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  }
}
