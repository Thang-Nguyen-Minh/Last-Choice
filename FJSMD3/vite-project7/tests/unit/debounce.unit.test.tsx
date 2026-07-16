import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDebouncedValue } from '../../src/exercises/Bai6_Autocomplete/useDebouncedValue'

describe('useDebouncedValue', () => {
  it('waits before publishing the latest value', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 350), {
      initialProps: { value: 'M' },
    })

    rerender({ value: 'Macbook' })
    expect(result.current).toBe('M')

    act(() => vi.advanceTimersByTime(350))
    expect(result.current).toBe('Macbook')
    vi.useRealTimers()
  })
})
