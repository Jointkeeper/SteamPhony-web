import { test, expect } from '@playwright/test';

test('home page loads without JS errors', async ({ page }) => {
  page.on('pageerror', (err) => {
    throw err;
  });
  await page.goto('/');
  await expect(page.locator('text=Трансформируем бизнес')).toBeVisible();
}); 