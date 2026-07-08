import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { resetMockApi } from '../../src/api/mockApi'
import Bai8OptimisticUpdates from '../../src/exercises/Bai8_OptimisticUpdates'
import { renderWithQueryClient } from './testUtils'

describe('Bài 8 optimistic updates integration', () => {
  beforeEach(() => resetMockApi())

  it('marks an order as resolved immediately on click', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Bai8OptimisticUpdates />)

    await screen.findByText('Đơn hàng vượt hạn xử lý')
    await user.click(screen.getAllByRole('button', { name: 'Đánh dấu đã xử lý' })[0])
    expect(screen.getByText('Đã xử lý')).toBeInTheDocument()
  })
})
