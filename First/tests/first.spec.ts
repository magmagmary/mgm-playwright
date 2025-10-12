import { test, expect } from '@playwright/test';

test('Doc tab has correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Docs' }).click();

  const docTabHeading = page.getByRole('heading', { name: 'IntroductionDirect link to' });

  await expect(docTabHeading).toHaveText('Introduction');
});