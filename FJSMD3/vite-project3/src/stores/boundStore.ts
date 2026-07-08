import { create } from 'zustand'

export type AuthSlice = {
  auth: {
    token: string | null
    login: (token: string) => void
    logout: () => void
  }
}

export type UiSlice = {
  ui: {
    toast: string | null
    modalOpen: boolean
    showToast: (message: string) => void
    clearToast: () => void
    setModalOpen: (open: boolean) => void
  }
}

export type BoundStore = AuthSlice & UiSlice

export const useBoundStore = create<BoundStore>((set) => ({
  auth: {
    token: null,
    login: (token) =>
      set((state) => ({
        auth: { ...state.auth, token },
      })),
    logout: () =>
      set((state) => ({
        auth: { ...state.auth, token: null },
      })),
  },
  ui: {
    toast: null,
    modalOpen: false,
    showToast: (message) =>
      set((state) => ({
        ui: { ...state.ui, toast: message },
      })),
    clearToast: () =>
      set((state) => ({
        ui: { ...state.ui, toast: null },
      })),
    setModalOpen: (open) =>
      set((state) => ({
        ui: { ...state.ui, modalOpen: open },
      })),
  },
}))

export function resetBoundStore() {
  useBoundStore.setState((state) => ({
    auth: { ...state.auth, token: null },
    ui: { ...state.ui, toast: null, modalOpen: false },
  }))
}
