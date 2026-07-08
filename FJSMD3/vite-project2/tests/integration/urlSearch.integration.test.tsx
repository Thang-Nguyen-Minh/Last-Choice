import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Bai6UrlSearchParams from '../../src/exercises/Bai6_UrlSearchParams'

describe('Bài 6 URL search params integration', () => {
  it('hydrates the input from query params and updates visible courses', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/?q=React']}>
        <Bai6UrlSearchParams />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Tìm kiếm khóa học')).toHaveValue('React')
    expect(screen.getByText('React Cơ bản')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Tìm kiếm khóa học'))
    expect(screen.getByText('Node API thực chiến')).toBeInTheDocument()
  })
})
