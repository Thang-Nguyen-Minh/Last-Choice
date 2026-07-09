import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { isIntentionalCancel } from '../../src/api/liveSearchApi'

describe('Bai 9 request cancellation', () => {
  it('classifies AbortController cancellation as intentional', () => {
    expect(isIntentionalCancel(new axios.CanceledError('canceled'))).toBe(true)
    expect(isIntentionalCancel(new Error('network failed'))).toBe(false)
  })
})
