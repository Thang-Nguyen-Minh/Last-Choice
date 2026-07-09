import { expect, test } from '@playwright/test'

test('vite-project4 form exercises work in browser', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 Form Exercises' })).toBeVisible()

  await page.getByTestId('tab-bai-5').click()
  await page.getByLabel('Họ tên').fill('An Nguyen')
  await page.getByLabel('CCCD').fill('012345678901')
  await page.getByLabel('Thu nhập hàng tháng').fill('6000000')
  await page.getByRole('button', { name: 'Gửi hồ sơ' }).click()
  await expect(page.getByText('Đã nhận hồ sơ: An Nguyen')).toBeVisible()

  await page.getByTestId('tab-bai-7').click()
  await page.getByLabel('Trạng thái việc làm').selectOption('employed')
  await expect(page.getByLabel('Công ty hiện tại')).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await page.getByRole('button', { name: 'Thêm món đồ' }).click()
  await expect(page.getByLabel('Tên món 2')).toBeVisible()

  await page.getByTestId('tab-bai-10').click()
  await page.getByLabel('Sĩ số').fill('2')
  await expect(page.getByLabel('Điểm sinh viên 2')).toBeVisible()
  await page.getByLabel('Điểm sinh viên 1').fill('11')
  await page.getByRole('button', { name: 'Lưu điểm' }).click()
  await expect(page.getByText('Điểm phải từ 0.0 đến 10.0')).toBeVisible()
})
