import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Bai5ThemeContext from '../../src/exercises/Bai5_ThemeContext'

describe('Bài 5 ThemeContext integration', () => {
  it('toggles theme from header and updates main/footer consumers', async () => {
    const user = userEvent.setup()
    render(<Bai5ThemeContext />)

    expect(screen.getByText('Theme hiện tại: light')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Dark Mode' }))
    expect(screen.getByText('Theme hiện tại: dark')).toBeInTheDocument()
    expect(screen.getByText(/Palette: ban đêm/i)).toBeInTheDocument()
  })
})
