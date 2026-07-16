import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CheckoutState = {
  address: string
  note: string
}

const initialState: CheckoutState = {
  address: '',
  note: '',
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
    },
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload
    },
    clearCheckout(state) {
      state.address = ''
      state.note = ''
    },
  },
})

export const { clearCheckout, setAddress, setNote } = checkoutSlice.actions
export const checkoutReducer = checkoutSlice.reducer
