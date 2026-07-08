import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('Dashboard integration', () => {
  it('switches through all exercise tabs', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    const tabs = [
      { id: 5, heading: 'Context API Theme' },
      { id: 6, heading: 'URL Search Params' },
      { id: 7, heading: 'Custom Countdown Hook' },
      { id: 8, heading: 'Cart useReducer' },
      { id: 9, heading: 'Protected Routes' },
      { id: 10, heading: 'useMemo & useCallback' },
    ]

    for (const tab of tabs) {
      await user.click(screen.getByTestId(`tab-bai-${tab.id}`))
      expect(screen.getByRole('heading', { name: tab.heading })).toBeInTheDocument()
    }
  })
})
