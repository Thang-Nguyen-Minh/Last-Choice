import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import WeatherWidget from '../../src/exercises/Bai5_Mocking/WeatherWidget'

describe('Bài 5 - WeatherWidget Mocking', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch')
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

  it('renders "Nắng đẹp" from mocked fetch without a real network request', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ condition: 'Nắng đẹp', temperature: 28, location: 'Hà Nội' }),
    } as Response)

    render(<WeatherWidget />)

    expect(await screen.findByText('Nắng đẹp')).toBeInTheDocument()
    expect(screen.getByText('28°C')).toBeInTheDocument()
    expect(screen.getByText('Hà Nội')).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith('/api/weather.json')
  })

  it('shows a friendly error when fetch fails', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'))

    render(<WeatherWidget />)

    await waitFor(() => expect(screen.getByText(/Lỗi: Network error/)).toBeInTheDocument())
  })
})
