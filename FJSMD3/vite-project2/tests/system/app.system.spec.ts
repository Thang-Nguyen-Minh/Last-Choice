import { expect, test } from '@playwright/test'

test('vite-project2 exercises work through the browser', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 Exercises 5-10' })).toBeVisible()

  await page.getByTestId('tab-bai-5').click()
  await page.getByRole('button', { name: 'Dark Mode' }).click()
  await expect(page.getByText('Theme hiện tại: dark')).toBeVisible()

  await page.getByTestId('tab-bai-6').click()
  await page.getByLabel('Tìm kiếm khóa học').fill('React')
  await expect(page).toHaveURL(/q=React/)
  await page.getByLabel('Tìm kiếm khóa học').fill('')
  await expect(page).not.toHaveURL(/q=/)

  await page.getByTestId('tab-bai-8').click()
  await page.getByRole('button', { name: 'Thêm khóa học' }).first().click()
  await page.getByRole('button', { name: 'Áp dụng mã' }).click()
  await expect(page.getByText('Mã hiện tại: SAVE10')).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await page.getByRole('link', { name: 'Vào phòng học ảo' }).click()
  await expect(page.getByRole('heading', { name: 'Đăng nhập' })).toBeVisible()
  await page.getByRole('button', { name: 'Đăng nhập vào phòng học' }).click()
  await expect(page.getByRole('heading', { name: 'Phòng học ảo' })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Đăng nhập' })).toBeHidden()

  await page.getByTestId('tab-bai-10').click()
  const filterRuns = await page.getByTestId('filter-runs').textContent()
  await page.getByRole('button', { name: 'Chưa kiểm tra' }).click()
  await expect(page.getByTestId('filter-runs')).toHaveText(filterRuns ?? '')
})
