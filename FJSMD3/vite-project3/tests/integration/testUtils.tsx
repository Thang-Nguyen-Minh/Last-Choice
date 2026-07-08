import { QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'
import { createAppQueryClient } from '../../src/queryClient'

export function renderWithQueryClient(ui: ReactElement, options?: RenderOptions) {
  const queryClient = createAppQueryClient()

  return {
    queryClient,
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options),
  }
}
