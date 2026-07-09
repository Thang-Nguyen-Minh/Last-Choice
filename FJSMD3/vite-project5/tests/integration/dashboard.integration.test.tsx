import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('Dashboard integration', () => {
  it('switches through API exercise tabs', async () => {
    const user = userEvent.setup()
    render(<App />)

    for (const item of [
      { id: 5, heading: 'Mock Server CRUD' },
      { id: 6, heading: 'PUT vs PATCH' },
      { id: 7, heading: 'Request Interceptor' },
      { id: 8, heading: 'Global Error Handling' },
      { id: 9, heading: 'Request Cancellation' },
      { id: 10, heading: 'Resilient API Client' },
    ]) {
      await user.click(screen.getByTestId(`tab-bai-${item.id}`))
      expect(screen.getByRole('heading', { name: item.heading })).toBeInTheDocument()
    }
  })
})
