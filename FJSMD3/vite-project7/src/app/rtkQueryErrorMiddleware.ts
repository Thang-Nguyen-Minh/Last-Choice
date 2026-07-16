import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import { pushToast } from '../features/toast/toastSlice'

type ErrorPayload = {
  status?: number
  data?: string
}

export const rtkQueryErrorMiddleware: Middleware = (storeApi) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as ErrorPayload
    const message = payload.data ?? `API lỗi ${payload.status ?? 'không xác định'}`
    storeApi.dispatch(pushToast({ type: 'error', message }))
  }

  return next(action)
}
