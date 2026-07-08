import { describe, expect, it } from 'vitest'
import { validateLoginInput } from '../../src/exercises/Bai6_LoginForm/loginValidation'

describe('Bài 6 login validation', () => {
  it('rejects empty fields', () => {
    expect(validateLoginInput({ username: '', password: '123456' })).toBe('Vui lòng kiểm tra lại thông tin')
    expect(validateLoginInput({ username: 'minh', password: '' })).toBe('Vui lòng kiểm tra lại thông tin')
  })

  it('rejects usernames that contain spaces', () => {
    expect(validateLoginInput({ username: 'minh nguyen', password: '123456' })).toBe('Vui lòng kiểm tra lại thông tin')
  })

  it('accepts valid login payloads', () => {
    expect(validateLoginInput({ username: 'minh', password: '123456' })).toBeNull()
  })
})
