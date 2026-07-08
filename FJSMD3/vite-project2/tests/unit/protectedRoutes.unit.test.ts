import { describe, expect, it } from 'vitest'
import { getRedirectTarget } from '../../src/exercises/Bai9_ProtectedRoutes/routeUtils'

describe('Bài 9 protected route helpers', () => {
  it('uses classroom as default redirect target', () => {
    expect(getRedirectTarget(null)).toBe('/classroom')
  })

  it('uses the saved protected location when available', () => {
    expect(getRedirectTarget({ from: { pathname: '/classroom' } as never })).toBe('/classroom')
  })
})
