import { expect, test } from '@playwright/test'

test('vite-project3 query and zustand exercises work in browser', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 Query & Zustand Exercises' })).toBeVisible()

  await page.getByTestId('tab-bai-5').click()
  await expect(page.getByText('ORD-101')).toBeVisible()
  await page.getByLabel('Lọc trạng thái').selectOption('Pending')
  await expect(page.getByText('ORD-102')).toBeHidden()

  await page.getByTestId('tab-bai-6').click()
  await expect(page.getByText(/đơn hàng/i)).toBeVisible()
  await page.getByRole('button', { name: 'Làm mới dữ liệu' }).click()
  await expect(page.getByRole('button', { name: 'Làm mới dữ liệu' })).toBeVisible()

  await page.getByTestId('tab-bai-8').click()
  await expect(page.getByText('Đơn hàng vượt hạn xử lý')).toBeVisible()
  await page.getByRole('button', { name: 'Đánh dấu đã xử lý' }).first().click()
  await expect(page.getByText('Đã xử lý', { exact: true })).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await expect(page.getByText(/Bearer jwt-demo-token/i)).toBeVisible()
  await page.getByRole('button', { name: 'Đăng xuất' }).click()
  await expect(page.getByText('Authorization header: Không gắn header')).toBeVisible()

  await page.getByTestId('tab-bai-10').click()
  await expect(page.getByText('Tai nghe học online')).toBeVisible()
  await page.getByRole('button', { name: 'Sửa số lượng' }).first().click()
  await page.getByLabel('Số lượng mới').fill('-1')
  await page.getByRole('button', { name: 'Lưu' }).click()
  await expect(page.getByText('Số lượng không được âm')).toBeVisible()
})
