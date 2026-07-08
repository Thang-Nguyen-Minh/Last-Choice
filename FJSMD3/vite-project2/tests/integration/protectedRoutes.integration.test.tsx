import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Bai9ProtectedRoutes from '../../src/exercises/Bai9_ProtectedRoutes'

describe('Bài 9 protected routes integration', () => {
  it('redirects direct classroom access to login and returns after auth', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/classroom']}>
        <Bai9ProtectedRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Đăng nhập vào phòng học' }))
    expect(screen.getByRole('heading', { name: 'Phòng học ảo' })).toBeInTheDocument()
  })
})
