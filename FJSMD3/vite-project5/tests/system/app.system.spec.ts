import { expect, test } from '@playwright/test'

test('vite-project5 API exercises work in browser', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 API Exercises' })).toBeVisible()

  await page.getByTestId('tab-bai-7').click()
  await page.getByRole('button', { name: 'Có token' }).click()
  await expect(page.getByText(/Request Headers: Bearer demo-access-token/)).toBeVisible()
  await page.getByRole('button', { name: 'Không token' }).click()
  await expect(page.getByText(/Không có Authorization/)).toBeVisible()

  await page.getByTestId('tab-bai-8').click()
  await page.getByRole('button', { name: 'Mô phỏng 401' }).click()
  await expect(page.getByText('Route hiện tại: /login')).toBeVisible()

  await page.getByTestId('tab-bai-10').click()
  await expect(page.getByText(/"q": "contact"/)).toBeVisible()
})
