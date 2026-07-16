import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import Bai10CheckoutFlow from '../../src/exercises/Bai10_CheckoutFlow'
import Bai5FilterSearch from '../../src/exercises/Bai5_FilterSearch'
import Bai7Optimistic from '../../src/exercises/Bai7_Optimistic'
import Bai9GlobalNotification from '../../src/exercises/Bai9_GlobalNotification'
import { resetMockData } from '../../src/services/mockData'
import { renderWithStore } from './testUtils'

describe('Project 7 exercise flows', () => {
  beforeEach(() => resetMockData())

  it('trims blank search and fetches Laptop results', async () => {
    const user = userEvent.setup()
    renderWithStore(<Bai5FilterSearch />)

    await user.type(screen.getByLabelText('Từ khóa tìm sản phẩm'), '   ')
    expect(screen.getByText(/API bị skip/)).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Từ khóa tìm sản phẩm'))
    await user.type(screen.getByLabelText('Từ khóa tìm sản phẩm'), 'Laptop')
    expect(await screen.findByText('Laptop Pro 14')).toBeInTheDocument()
  })

  it('optimistically likes a post immediately', async () => {
    const user = userEvent.setup()
    renderWithStore(<Bai7Optimistic />)

    const button = await screen.findByRole('button', { name: 'Thích' })
    await user.click(button)

    expect(screen.getByRole('button', { name: 'Đã thích' })).toBeInTheDocument()
  })

  it('shows global toast when RTK Query request fails', async () => {
    const user = userEvent.setup()
    renderWithStore(<Bai9GlobalNotification />)

    await user.click(screen.getByRole('button', { name: 'Gọi API lỗi 500' }))

    expect(await screen.findByText(/Lỗi 500/)).toBeInTheDocument()
  })

  it('creates order then clears cart', async () => {
    const user = userEvent.setup()
    renderWithStore(<Bai10CheckoutFlow />)

    const addButtons = await screen.findAllByRole('button', { name: 'Thêm' })
    await user.click(addButtons[0])
    await user.type(screen.getByLabelText('Địa chỉ giao hàng'), '12 Nguyễn Trãi, Hà Nội')
    await user.click(screen.getByRole('button', { name: 'Thanh toán' }))

    expect(await screen.findByText(/Tạo đơn/)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Giỏ hàng rỗng')).toBeInTheDocument())
  })
})
