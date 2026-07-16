import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type Toast = {
  id: string
  type: 'success' | 'error'
  message: string
}

export type ToastState = {
  items: Toast[]
}

const initialState: ToastState = {
  items: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.items.push(action.payload)
      },
      prepare(input: Omit<Toast, 'id'>) {
        return { payload: { id: nanoid(), ...input } }
      },
    },
    removeToast(state, action: PayloadAction<string>) {
      state.items = state.items.filter((toast) => toast.id !== action.payload)
    },
    clearToasts(state) {
      state.items = []
    },
  },
})

export const { clearToasts, pushToast, removeToast } = toastSlice.actions
export const toastReducer = toastSlice.reducer
