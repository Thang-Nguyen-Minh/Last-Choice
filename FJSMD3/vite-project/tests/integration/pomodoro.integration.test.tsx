import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import PomodoroTimer from '../../src/exercises/Bai9_PomodoroTimer/PomodoroTimer'

describe('Bài 9 PomodoroTimer integration', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('handles play, pause, reset, and finish states', () => {
    vi.useFakeTimers()
    render(<PomodoroTimer initialSeconds={2} />)

    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent('00:02')

    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent('00:01')

    fireEvent.click(screen.getByRole('button', { name: 'Tạm dừng' }))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent('00:01')

    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent('00:00')
    expect(screen.getByText('Hết giờ!')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Đặt lại' }))
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent('00:02')
  })
})
