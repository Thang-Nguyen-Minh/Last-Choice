import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeConsumerOutsideProvider } from '../../src/exercises/Bai5_ThemeContext/ThemeParts'

describe('Bài 5 ThemeContext', () => {
  it('returns a safe fallback when consumer is outside provider', () => {
    render(<ThemeConsumerOutsideProvider />)

    expect(screen.getByText(/Safe fallback: light theme/i)).toBeInTheDocument()
  })
})
