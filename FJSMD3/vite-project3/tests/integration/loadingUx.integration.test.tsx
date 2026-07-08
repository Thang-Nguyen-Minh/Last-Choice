import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { resetMockApi } from '../../src/api/mockApi'
import Bai7LoadingUx from '../../src/exercises/Bai7_LoadingUx'
import { renderWithQueryClient } from './testUtils'

describe('Bài 7 loading UX integration', () => {
  beforeEach(() => resetMockApi())

  it('uses skeleton for first load and soft indicator for refetch', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Bai7LoadingUx />)

    expect(screen.getByLabelText('Skeleton khách hàng')).toBeInTheDocument()
    await screen.findByText('Lan Nguyễn')
    await user.click(screen.getByRole('button', { name: 'Mô phỏng background refetch' }))
    expect(screen.getByText('Đang đồng bộ nền')).toBeInTheDocument()
    expect(screen.queryByLabelText('Skeleton khách hàng')).not.toBeInTheDocument()
  })
})
