import { expect, test } from '@playwright/test'

test('dashboard exposes exercises and core user flows', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'React TypeScript Assignments' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Pricing Table' })).toBeVisible()
  await expect(page.getByText('Liên hệ', { exact: true })).toBeVisible()

  await page.getByTestId('tab-bai-6').click()
  await page.getByLabel('Username').fill('minh nguyen')
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await expect(page.getByText('Vui lòng kiểm tra lại thông tin')).toBeVisible()
  await page.getByLabel('Username').fill('minh')
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await expect(page.getByText('Vui lòng kiểm tra lại thông tin')).toBeHidden()

  await page.getByTestId('tab-bai-7').click()
  await expect(page.getByText('Đăng nhập ngay')).toBeVisible()
  await page.getByRole('button', { name: 'Đổi sang đã đăng nhập' }).click()
  await expect(page.getByText('Chào mừng trở lại')).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await expect(page.getByLabel('Thời gian còn lại')).toHaveText('25:00')
  await page.getByRole('button', { name: 'Bắt đầu' }).click()
  await expect(page.getByRole('button', { name: 'Tạm dừng' })).toBeEnabled()
  await page.getByRole('button', { name: 'Tạm dừng' }).click()
  await page.getByRole('button', { name: 'Đặt lại' }).click()
  await expect(page.getByLabel('Thời gian còn lại')).toHaveText('25:00')

  await page.getByTestId('tab-bai-10').click()
  await page.getByRole('button', { name: /Một project có thể nộp nhiều bài không/i }).click()
  await expect(page.getByText(/Dashboard tab giúp giảng viên/i)).toBeVisible()
  await page.getByRole('button', { name: /Vì sao activeIndex nằm ở FaqList/i }).click()
  await expect(page.getByText(/Dashboard tab giúp giảng viên/i)).toBeHidden()
  await expect(page.getByText(/FaqList là cha chung/i)).toBeVisible()
})
