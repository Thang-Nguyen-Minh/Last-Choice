import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '../features/cart/cartSlice'
import { checkoutReducer } from '../features/checkout/checkoutSlice'
import { searchReducer } from '../features/search/searchSlice'
import { toastReducer } from '../features/toast/toastSlice'
import { apiSlice } from '../services/apiSlice'
import { rtkQueryErrorMiddleware } from './rtkQueryErrorMiddleware'

export function makeStore() {
  return configureStore({
    reducer: {
      search: searchReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
      toast: toastReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorMiddleware),
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
