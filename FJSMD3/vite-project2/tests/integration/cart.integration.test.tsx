import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Bai8CartReducer from '../../src/exercises/Bai8_CartReducer'

describe('Bài 8 cart integration', () => {
  it('adds one course once and applies coupon', async () => {
    const user = userEvent.setup()
    render(<Bai8CartReducer />)

    const addButtons = screen.getAllByRole('button', { name: 'Thêm khóa học' })
    await user.click(addButtons[0])
    await user.click(addButtons[0])
    expect(screen.getAllByText('React State Mastery')).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: 'Áp dụng mã' }))
    expect(screen.getByText('Mã hiện tại: SAVE10')).toBeInTheDocument()
  })
})
