import { beforeEach, describe, expect, it } from 'vitest'
import { attachAuthHeader } from '../../src/api/axiosSimulator'
import { resetBoundStore, useBoundStore } from '../../src/stores/boundStore'

describe('Bài 9 vanilla Zustand access', () => {
  beforeEach(() => {
    resetBoundStore()
  })

  it('attaches token from getState outside React', () => {
    useBoundStore.getState().auth.login('token-123')

    expect(attachAuthHeader({ url: '/orders' }).headers?.Authorization).toBe('Bearer token-123')
  })

  it('does not attach Authorization when token is null', () => {
    expect(attachAuthHeader({ url: '/orders' }).headers?.Authorization).toBeUndefined()
  })
})
