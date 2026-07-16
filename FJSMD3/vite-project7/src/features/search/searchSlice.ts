import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchState = {
  keyword: string
}

const initialState: SearchState = {
  keyword: '',
}

export const normalizeKeyword = (value: string) => value.trim()

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = normalizeKeyword(action.payload)
    },
    clearKeyword(state) {
      state.keyword = ''
    },
  },
})

export const { clearKeyword, setKeyword } = searchSlice.actions
export const searchReducer = searchSlice.reducer
