import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 800 } });

const navLabels = {
  en: {
    open: 'Open menu',
    services: 'Services & Expertise',
  },
  ru: {
    open: 'Открыть меню',
    services: 'Услуги и экспертиза',
  },
};

const locales: ('en' | 'ru')[] = ['en', 'ru'];

test.describe('mobile drawer navigation', () => {
  for (const lang of locales) {
    test(`drawer opens and navigates to services – ${lang}`, async ({ page }) => {
      await page.goto(`/${lang}/`);
      // open drawer
      await page.getByRole('button', { name: navLabels[lang].open }).click();
      await expect(page.getByRole('dialog', { name: 'Mobile navigation menu' })).toBeVisible();

      // click Services link
      await page.getByRole('link', { name: navLabels[lang].services }).click();
      await expect(page).toHaveURL(`/${lang}/services`);

      // drawer should close automatically
      await expect(page.getByRole('dialog', { name: 'Mobile navigation menu' })).not.toBeVisible();
    });
  }
}); 