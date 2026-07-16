import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../../src/App'
import { resetMockData } from '../../src/services/mockData'
import { renderWithStore } from './testUtils'

describe('Project 7 dashboard', () => {
  beforeEach(() => resetMockData())

  it('switches all tabs from Bài 5 to Bài 10', async () => {
    const user = userEvent.setup()
    renderWithStore(<App />)

    const tabs = [
      ['tab-bai-5', 'Đồng bộ Client State & Server State'],
      ['tab-bai-6', 'Autocomplete Search chống spam API'],
      ['tab-bai-7', 'Optimistic Updates'],
      ['tab-bai-8', 'Mutations & InvalidatesTags'],
      ['tab-bai-9', 'Mini Notification bắt lỗi Global'],
      ['tab-bai-10', 'Mini E-commerce Checkout'],
    ] as const

    for (const [testId, heading] of tabs) {
      await user.click(screen.getByTestId(testId))
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })
})
