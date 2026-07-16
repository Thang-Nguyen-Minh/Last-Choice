import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WeatherWidget from '../../src/exercises/Bai5_Mocking/WeatherWidget'
import Bai8Matchers from '../../src/exercises/Bai8_Matchers'
import SmartCounter from '../../src/exercises/Bai9_TDD/SmartCounter'

describe('Project 6 exercise flows', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders mocked weather data through the component lifecycle', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ condition: 'Nắng đẹp', temperature: 28, location: 'Hà Nội' }),
    } as Response)

    render(<WeatherWidget />)

    expect(await screen.findByText('Nắng đẹp')).toBeInTheDocument()
  })

  it('toggles dynamic matcher data and keeps Admin visible', async () => {
    const user = userEvent.setup()
    render(<Bai8Matchers />)

    await user.click(screen.getByRole('button', { name: 'Thêm lastLoginDate' }))

    expect(screen.getByText(/2026-07-16T09:00:00.000Z/)).toBeInTheDocument()
    expect(screen.getByText('Admin nằm trong kết quả.')).toBeInTheDocument()
  })

  it('increments, prevents negative values, and resets SmartCounter', async () => {
    const user = userEvent.setup()
    render(<SmartCounter />)

    await user.click(screen.getByRole('button', { name: 'Giảm' }))
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: 'Tăng' }))
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1')

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0')
  })
})
