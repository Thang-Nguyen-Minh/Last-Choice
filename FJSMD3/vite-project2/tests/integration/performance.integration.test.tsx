import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Bai10PerformanceMemo from '../../src/exercises/Bai10_PerformanceMemo'

describe('Bài 10 performance integration', () => {
  it('does not recompute filtered students when the independent checked button changes', async () => {
    const user = userEvent.setup()
    render(<Bai10PerformanceMemo />)

    const before = screen.getByTestId('filter-runs').textContent
    await user.click(screen.getByRole('button', { name: 'Chưa kiểm tra' }))
    expect(screen.getByTestId('filter-runs')).toHaveTextContent(before ?? '')

    await user.type(screen.getByLabelText('Tìm học viên'), '20')
    expect(screen.getByTestId('filter-runs')).not.toHaveTextContent(before ?? '')
  })
})
