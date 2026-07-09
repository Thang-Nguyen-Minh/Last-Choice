import AxiosMockAdapter from 'axios-mock-adapter'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { contactsClient } from '../../src/api/contactsApi'
import Bai5CrudContacts from '../../src/exercises/Bai5_CrudContacts'
import Bai7RequestInterceptor from '../../src/exercises/Bai7_RequestInterceptor'
import Bai8GlobalErrorHandling from '../../src/exercises/Bai8_GlobalErrorHandling'
import Bai10ResilientClient from '../../src/exercises/Bai10_ResilientClient'

const mock = new AxiosMockAdapter(contactsClient)

describe('API UI integration', () => {
  afterEach(() => mock.reset())

  it('handles contact CRUD 404 and interceptor UI', async () => {
    const user = userEvent.setup()
    mock.onDelete('/contacts/missing-id').reply(404)
    render(<Bai5CrudContacts />)
    await user.click(screen.getByRole('button', { name: 'DELETE ID không tồn tại' }))
    expect(await screen.findByText('Không tìm thấy danh bạ để xóa')).toBeInTheDocument()
  })

  it('shows request interceptor and global 401 behavior', async () => {
    const user = userEvent.setup()
    render(<Bai7RequestInterceptor />)
    await user.click(screen.getByRole('button', { name: 'Có token' }))
    expect(screen.getByText(/Request Headers: Bearer demo-access-token/)).toBeInTheDocument()

    render(<Bai8GlobalErrorHandling />)
    await user.click(screen.getByRole('button', { name: 'Mô phỏng 401' }))
    expect(screen.getByText('Route hiện tại: /login')).toBeInTheDocument()
  })

  it('shows cleaned params in resilient client screen', () => {
    render(<Bai10ResilientClient />)
    expect(screen.getByText(/"q": "contact"/)).toBeInTheDocument()
    expect(screen.queryByText('undefined')).not.toBeInTheDocument()
  })
})
