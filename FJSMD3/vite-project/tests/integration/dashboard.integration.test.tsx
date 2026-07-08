import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('Dashboard integration', () => {
  it('switches between exercises 5 to 10', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Pricing Table' })).toBeInTheDocument()

    const expectedPanels = [
      { id: 6, heading: 'Controlled Login Form', body: 'Component Form Đăng Nhập' },
      { id: 7, heading: 'Conditional Rendering', body: 'WelcomeBanner' },
      { id: 8, heading: 'Lifecycle Performance', body: 'Tối ưu hiệu năng Lifecycle' },
      { id: 9, heading: 'Pomodoro Timer', body: 'Máy đếm ngược Pomodoro' },
      { id: 10, heading: 'FAQ Accordion', body: 'Hệ thống Câu hỏi thường gặp' },
    ]

    for (const panel of expectedPanels) {
      await user.click(screen.getByTestId(`tab-bai-${panel.id}`))
      expect(screen.getByRole('heading', { name: panel.heading })).toBeInTheDocument()
      expect(screen.getByText(panel.body)).toBeInTheDocument()
    }
  })
})
