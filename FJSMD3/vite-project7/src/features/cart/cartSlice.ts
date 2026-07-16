import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existing = state.items.find((item) => item.productId === action.payload.productId)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
