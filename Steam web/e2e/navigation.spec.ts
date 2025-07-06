import { test, expect } from '@playwright/test';

const routes = ['', '/services', '/work', '/about', '/contact'];
const locales = ['en', 'ru'];

test.describe('navigation routes', () => {
  for (const lang of locales) {
    for (const route of routes) {
      const path = `/${lang}${route}`;
      test(`GET ${path} returns 200 and renders`, async ({ page }) => {
        page.on('pageerror', (err) => {
          throw err;
        });
        const response = await page.goto(path);
        expect(response?.ok()).toBeTruthy();
        // Basic smoke: header nav should be visible
        await expect(page.locator('header')).toBeVisible();
      });
    }
  }
}); 