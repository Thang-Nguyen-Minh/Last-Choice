import { describe, expect, it } from 'vitest'
import { REVENUE_STALE_TIME } from '../../src/exercises/Bai6_CacheLifecycle/queryOptions'

describe('Bài 6 cache lifecycle', () => {
  it('keeps revenue fresh for 5 minutes', () => {
    expect(REVENUE_STALE_TIME).toBe(5 * 60 * 1000)
  })
})
