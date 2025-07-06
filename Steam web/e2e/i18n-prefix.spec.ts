import { test, expect } from '@playwright/test';

const navContactLabel = {
  en: 'Contact',
  ru: 'Контакты',
};

(['en', 'ru'] as const).forEach((lang) => {
  test(`header Contact link keeps ${lang} prefix`, async ({ page }) => {
    await page.goto(`/${lang}/`);
    await page.getByRole('link', { name: navContactLabel[lang] }).click();
    await expect(page).toHaveURL(`/${lang}/contact`);
  });
}); 