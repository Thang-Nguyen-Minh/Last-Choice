import { expect, test } from '@playwright/test'

test('vite-project6 testing exercises work in browser', async ({ page }) => {
  await page.route('**/api/weather', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ condition: 'Nắng đẹp', temperature: 28, location: 'Hà Nội' }),
    })
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FJSMD3 Project 6: Bài 5-10' })).toBeVisible()
  await expect(page.getByText('Nắng đẹp', { exact: true }).first()).toBeVisible()

  await page.getByTestId('tab-bai-8').click()
  await page.getByRole('button', { name: 'Thêm lastLoginDate' }).click()
  await expect(page.getByText('Admin nằm trong kết quả.')).toBeVisible()

  await page.getByTestId('tab-bai-9').click()
  await page.getByRole('button', { name: 'Tăng' }).click()
  await expect(page.getByTestId('counter-value')).toHaveText('1')
  await page.getByRole('button', { name: 'Giảm' }).click()
  await expect(page.getByTestId('counter-value')).toHaveText('0')

  await page.getByTestId('tab-bai-10').click()
  await expect(page.getByText('npm run test && npm run build').first()).toBeVisible()
})
