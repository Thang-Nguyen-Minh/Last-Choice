import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { apiCounters, resetMockApi } from '../../src/api/mockApi'
import Bai6CacheLifecycle from '../../src/exercises/Bai6_CacheLifecycle'
import { renderWithQueryClient } from './testUtils'

describe('Bài 6 cache lifecycle integration', () => {
  beforeEach(() => resetMockApi())

  it('force refresh calls the revenue API again', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Bai6CacheLifecycle />)

    await screen.findByText(/đơn hàng/i)
    expect(apiCounters.revenue).toBe(1)
    await user.click(screen.getByRole('button', { name: 'Làm mới dữ liệu' }))
    await waitFor(() => expect(apiCounters.revenue).toBe(2))
  })
})
