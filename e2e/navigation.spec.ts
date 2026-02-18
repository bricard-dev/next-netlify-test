import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads and displays the header with the logo', async ({
    page,
  }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // The BrandLogo renders a link to "/" with a bakery name
    const logo = header.locator('a[href="/"]');
    await expect(logo).toBeVisible();
  });

  test('mobile menu opens on burger click', async ({ page }) => {
    await page.goto('/');

    const burger = page.getByRole('button', { name: 'Ouvrir le menu' });
    await expect(burger).toBeVisible();

    await burger.click();

    // After opening, the close button should appear
    const closeButton = page.getByRole('button', { name: 'Fermer le menu' });
    await expect(closeButton).toBeVisible();
  });

  test('mobile menu closes on logo click', async ({ page }) => {
    await page.goto('/');

    // Open the menu
    const burger = page.getByRole('button', { name: 'Ouvrir le menu' });
    await burger.click();

    await expect(
      page.getByRole('button', { name: 'Fermer le menu' }),
    ).toBeVisible();

    // Click the logo to close the menu
    const header = page.locator('header');
    const logo = header.locator('a[href="/"]').first();
    await logo.click();

    // The burger button should be back
    await expect(
      page.getByRole('button', { name: 'Ouvrir le menu' }),
    ).toBeVisible();
  });
});
