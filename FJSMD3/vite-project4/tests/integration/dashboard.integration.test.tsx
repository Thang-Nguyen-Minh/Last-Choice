import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/App'

describe('Dashboard integration', () => {
  it('switches through all form exercise tabs', async () => {
    const user = userEvent.setup()
    render(<App />)

    for (const item of [
      { id: 5, heading: 'Formik & Yup' },
      { id: 6, heading: 'RHF Uncontrolled' },
      { id: 7, heading: 'Dependent Schema' },
      { id: 8, heading: 'Performance Report' },
      { id: 9, heading: 'Dynamic Fields' },
      { id: 10, heading: 'Grade Kiosk' },
    ]) {
      await user.click(screen.getByTestId(`tab-bai-${item.id}`))
      expect(screen.getByRole('heading', { name: item.heading })).toBeInTheDocument()
    }
  })
})
