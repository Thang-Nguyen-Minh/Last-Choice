import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Bai10FaqAccordion from '../../src/exercises/Bai10_FaqAccordion'

describe('Bài 10 FAQ integration', () => {
  it('keeps only one answer open and closes the active item on second click', async () => {
    const user = userEvent.setup()
    render(<Bai10FaqAccordion />)

    const firstQuestion = screen.getByRole('button', { name: /Một project có thể nộp nhiều bài không/i })
    const secondQuestion = screen.getByRole('button', { name: /Vì sao activeIndex nằm ở FaqList/i })

    await user.click(firstQuestion)
    expect(screen.getByText(/Dashboard tab giúp giảng viên/i)).toBeInTheDocument()

    await user.click(secondQuestion)
    expect(screen.queryByText(/Dashboard tab giúp giảng viên/i)).not.toBeInTheDocument()
    expect(screen.getByText(/FaqList là cha chung/i)).toBeInTheDocument()

    await user.click(secondQuestion)
    expect(screen.queryByText(/FaqList là cha chung/i)).not.toBeInTheDocument()
  })
})
