import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Bai10GradeKiosk from '../../src/exercises/Bai10_GradeKiosk'
import Bai5FormikYup from '../../src/exercises/Bai5_FormikYup'
import Bai6RhfUncontrolled from '../../src/exercises/Bai6_RhfUncontrolled'
import Bai7DependentSchema from '../../src/exercises/Bai7_DependentSchema'
import Bai9DynamicFields from '../../src/exercises/Bai9_DynamicFields'

describe('Form exercises integration', () => {
  it('validates and submits the Formik credit card form', async () => {
    const user = userEvent.setup()
    render(<Bai5FormikYup />)

    await user.click(screen.getByRole('button', { name: 'Gửi hồ sơ' }))
    expect(await screen.findByText('Họ tên là bắt buộc')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Họ tên'), 'An Nguyen')
    await user.type(screen.getByLabelText('CCCD'), '012345678901')
    await user.type(screen.getByLabelText('Thu nhập hàng tháng'), '6000000')
    await user.click(screen.getByRole('button', { name: 'Gửi hồ sơ' }))
    expect(await screen.findByText('Đã nhận hồ sơ: An Nguyen')).toBeInTheDocument()
  })

  it('validates RHF uncontrolled blog content', async () => {
    const user = userEvent.setup()
    render(<Bai6RhfUncontrolled />)

    await user.type(screen.getByLabelText('Tiêu đề'), 'Bài viết')
    await user.type(screen.getByLabelText('Nội dung'), 'quá ngắn')
    await user.click(screen.getByRole('button', { name: 'Lưu bài viết' }))
    expect(await screen.findByText('Nội dung tối thiểu 50 ký tự')).toBeInTheDocument()
  })

  it('shows current company only for employed candidates', async () => {
    const user = userEvent.setup()
    render(<Bai7DependentSchema />)

    expect(screen.queryByLabelText('Công ty hiện tại')).not.toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Trạng thái việc làm'), 'employed')
    expect(screen.getByLabelText('Công ty hiện tại')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Nộp hồ sơ' }))
    expect(await screen.findByText('Công ty hiện tại là bắt buộc')).toBeInTheDocument()
  })

  it('adds and removes dynamic budget fields', async () => {
    const user = userEvent.setup()
    render(<Bai9DynamicFields />)

    await user.click(screen.getByRole('button', { name: 'Thêm món đồ' }))
    expect(screen.getByLabelText('Tên món 2')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'Xóa' })[1])
    expect(screen.queryByLabelText('Tên món 2')).not.toBeInTheDocument()
  })

  it('renders score inputs from student count and blocks invalid scores', async () => {
    const user = userEvent.setup()
    render(<Bai10GradeKiosk />)

    await user.type(screen.getByLabelText('Sĩ số'), '2')
    await waitFor(() => expect(screen.getByLabelText('Điểm sinh viên 2')).toBeInTheDocument())
    await user.type(screen.getByLabelText('Mã môn học'), 'MATH1')
    await user.type(screen.getByLabelText('Điểm sinh viên 1'), '11')
    await user.type(screen.getByLabelText('Điểm sinh viên 2'), '8')
    await user.click(screen.getByRole('button', { name: 'Lưu điểm' }))
    expect(await screen.findByText('Điểm phải từ 0.0 đến 10.0')).toBeInTheDocument()
  })
})
