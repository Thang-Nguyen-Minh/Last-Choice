import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { formatCountdown, useCountdown } from '../../src/hooks/useCountdown'

describe('Bài 7 useCountdown', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats time safely', () => {
    expect(formatCountdown(61)).toBe('01:01')
    expect(formatCountdown(-5)).toBe('00:00')
  })

  it('starts, pauses, resets, and stops at zero', () => {
    vi.useFakeTimers()
    const { result, unmount } = renderHook(() => useCountdown(2))

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.secondsLeft).toBe(1)

    act(() => result.current.pause())
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.secondsLeft).toBe(1)

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.secondsLeft).toBe(0)
    expect(result.current.status).toBe('finished')

    act(() => result.current.reset())
    expect(result.current.secondsLeft).toBe(2)

    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
