import { create } from 'zustand'
import { type InventoryItem } from '../api/mockApi'

type InventoryUiState = {
  selectedItem: InventoryItem | null
  openSidebar: (item: InventoryItem) => void
  closeSidebar: () => void
  reset: () => void
}

export const useInventoryUiStore = create<InventoryUiState>((set) => ({
  selectedItem: null,
  openSidebar: (item) => set({ selectedItem: item }),
  closeSidebar: () => set({ selectedItem: null }),
  reset: () => set({ selectedItem: null }),
}))
