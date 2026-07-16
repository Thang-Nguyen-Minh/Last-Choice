import { expect, test } from '@playwright/test'

test('vite-project7 Redux RTK Query exercises work in browser', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 Project 7: Bài 5-10' })).toBeVisible()

  await page.getByLabel('Từ khóa tìm sản phẩm').fill('Laptop')
  await expect(page.getByText('Laptop Pro 14')).toBeVisible()

  await page.getByTestId('tab-bai-7').click()
  await page.getByRole('button', { name: 'Thích' }).click()
  await expect(page.getByRole('button', { name: 'Đã thích' })).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await page.getByRole('button', { name: 'Gọi API lỗi 500' }).click()
  await expect(page.getByText(/Lỗi 500/)).toBeVisible()

  await page.getByTestId('tab-bai-10').click()
  await page.getByRole('button', { name: 'Thêm' }).first().click()
  await page.getByLabel('Địa chỉ giao hàng').fill('12 Nguyễn Trãi, Hà Nội')
  await page.getByRole('button', { name: 'Thanh toán' }).click()
  await expect(page.getByText(/Tạo đơn/)).toBeVisible()
})
