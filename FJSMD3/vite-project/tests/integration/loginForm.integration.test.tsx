import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LoginForm from '../../src/exercises/Bai6_LoginForm/LoginForm'

describe('Bài 6 LoginForm integration', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('blocks invalid data and logs valid controlled state', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.type(screen.getByLabelText('Username'), 'minh nguyen')
    await user.type(screen.getByLabelText('Password'), '123456')
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Vui lòng kiểm tra lại thông tin')
    expect(consoleSpy).not.toHaveBeenCalled()

    await user.clear(screen.getByLabelText('Username'))
    await user.type(screen.getByLabelText('Username'), 'minh')
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalledWith('Login state:', { username: 'minh', password: '123456' })
  })
})
