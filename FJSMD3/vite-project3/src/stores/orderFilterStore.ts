import { create } from 'zustand'
import { type OrderStatus } from '../api/mockApi'

export type OrderFilterState = {
  status: OrderStatus | 'All'
  search: string
  setStatus: (status: OrderStatus | 'All') => void
  setSearch: (search: string) => void
  reset: () => void
}

export const initialOrderFilterState = {
  status: 'All' as const,
  search: '',
}

export function sanitizeSearch(search: string): string {
  return search.trim()
}

export const useOrderFilterStore = create<OrderFilterState>((set) => ({
  ...initialOrderFilterState,
  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search: sanitizeSearch(search) }),
  reset: () => set(initialOrderFilterState),
}))
