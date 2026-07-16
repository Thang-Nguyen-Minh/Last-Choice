import { Provider } from 'react-redux'
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { makeStore, type AppStore } from '../../src/app/store'

export function renderWithStore(ui: ReactElement, store: AppStore = makeStore()) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  }
}
