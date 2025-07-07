import { test, expect } from '@playwright/test';
test('contact form submission', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[name="name"]', 'E2E User');
    await page.fill('input[name="email"]', 'e2e@example.com');
    await page.fill('textarea[name="message"]', 'E2E automated test message');
    const [response] = await Promise.all([
        page.waitForResponse((res) => res.url().includes('/api/contact') && res.status() === 201),
        page.click('button:has-text("Отправить")'),
    ]);
    expect(response.ok()).toBeTruthy();
    await expect(page.locator('text=Спасибо')).toBeVisible();
});
