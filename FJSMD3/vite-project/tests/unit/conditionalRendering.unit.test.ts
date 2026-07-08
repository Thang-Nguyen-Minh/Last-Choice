import { describe, expect, it } from 'vitest'
import { getWelcomeMessage } from '../../src/exercises/Bai7_WelcomeBanner/conditionalRendering'

describe('Bài 7 conditional rendering', () => {
  it('returns the guest call to action when logged out', () => {
    expect(getWelcomeMessage(false)).toBe('Đăng nhập ngay')
  })

  it('returns the welcome message when logged in', () => {
    expect(getWelcomeMessage(true)).toBe('Chào mừng trở lại')
  })
})
