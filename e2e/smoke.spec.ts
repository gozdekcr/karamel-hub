import { expect, test } from '@playwright/test'

test.describe('smoke', () => {
  test.describe('Turkish browser', () => {
    test.use({ locale: 'tr-TR' })

    test('shows the home page in Turkish', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText("Karamel-hub'a hoş geldin")
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    })
  })

  test.describe('English browser', () => {
    test.use({ locale: 'en-US' })

    test('shows the home page in English', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to Karamel-hub')
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    })

    test('shows the not-found page for an unknown path', async ({ page }) => {
      await page.goto('/does-not-exist')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
    })
  })

  test('uses Nunito', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    const family = await heading.evaluate((el) => getComputedStyle(el).fontFamily)
    expect(family).toContain('Nunito Variable')
    expect(await page.evaluate(() => document.fonts.check('800 16px "Nunito Variable"'))).toBe(true)
  })
})
