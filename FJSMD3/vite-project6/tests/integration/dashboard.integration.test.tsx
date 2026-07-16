import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../../src/App'

describe('Project 6 dashboard integration', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('switches tabs from Bài 5 to Bài 10', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ condition: 'Nắng đẹp', temperature: 28, location: 'Hà Nội' }),
    } as Response)

    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'FJSMD3 Project 6: Bài 5-10' })).toBeInTheDocument()

    const expectedHeadings = [
      ['tab-bai-5', 'Cô lập môi trường mạng bằng Mocking'],
      ['tab-bai-6', 'Đóng gói và phân tích quá trình Build'],
      ['tab-bai-7', 'Đánh giá Trade-off: Ma trận Render'],
      ['tab-bai-8', 'Phân tích đa giải pháp: Array/Object Matchers'],
      ['tab-bai-9', 'Phát triển tính năng với TDD'],
      ['tab-bai-10', 'Mini Product: CI/CD Pipeline Automation'],
    ] as const

    for (const [tabId, heading] of expectedHeadings) {
      await user.click(screen.getByTestId(tabId))
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
  })
})
