import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'
import { createAppQueryClient } from '../../src/queryClient'

describe('Dashboard integration', () => {
  it('switches exercise tabs', async () => {
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createAppQueryClient()}>
        <App />
      </QueryClientProvider>,
    )

    for (const item of [
      { id: 5, heading: 'Filter Dashboard' },
      { id: 6, heading: 'Cache Lifecycle' },
      { id: 7, heading: 'Loading UX' },
      { id: 8, heading: 'Optimistic Updates' },
      { id: 9, heading: 'Zustand Slices' },
      { id: 10, heading: 'Inventory Module' },
    ]) {
      await user.click(screen.getByTestId(`tab-bai-${item.id}`))
      expect(screen.getByRole('heading', { name: item.heading })).toBeInTheDocument()
    }
  })
})
