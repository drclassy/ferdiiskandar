import { test, expect } from '@playwright/test'

test('theme toggle switches between light and dark', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

  const toggle = page.locator('.fi-theme-toggle')

  await expect(toggle).toBeVisible()

  const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))

  await toggle.click()

  const nextTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))

  expect(initialTheme).not.toBe(nextTheme)
  expect(['light', 'dark']).toContain(nextTheme)
})
