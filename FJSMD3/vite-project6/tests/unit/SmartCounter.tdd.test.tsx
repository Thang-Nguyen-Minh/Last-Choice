import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { SmartCounter } from '../../src/exercises/Bai9_TDD/SmartCounter'

describe('Bài 9 - TDD SmartCounter', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('Test 1: hiển thị ban đầu là 0', () => {
    render(<SmartCounter />)

    expect(screen.getByTestId('counter-value')).toHaveTextContent('0')
  })

  it('Test 2: bấm Tăng lên 1', async () => {
    render(<SmartCounter />)

    await user.click(screen.getByRole('button', { name: 'Tăng' }))

    expect(screen.getByTestId('counter-value')).toHaveTextContent('1')
  })

  it('Test 3: bấm Giảm tại 0 vẫn là 0', async () => {
    render(<SmartCounter />)

    await user.click(screen.getByRole('button', { name: 'Giảm' }))

    expect(screen.getByTestId('counter-value')).toHaveTextContent('0')
  })

  it('Reset đưa bộ đếm về 0', async () => {
    render(<SmartCounter />)

    await user.click(screen.getByRole('button', { name: 'Tăng' }))
    await user.click(screen.getByRole('button', { name: 'Tăng' }))
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByTestId('counter-value')).toHaveTextContent('0')
  })
})
