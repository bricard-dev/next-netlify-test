import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test('renders the hero section with a visible heading', async ({ page }) => {
    await page.goto('/');

    // Hero h1 must be visible — if it's missing the page returned null (no Sanity data)
    const hero = page.getByRole('heading', { level: 1 });
    await expect(hero).toBeVisible();
  });

  test('renders the products section with at least one product card', async ({
    page,
  }) => {
    await page.goto('/');

    // The h2 "Les favoris fraîchement sortis du four" (or any products heading)
    const productsHeading = page.getByRole('heading', { level: 2 }).nth(0);
    await expect(productsHeading).toBeVisible();

    // At least one product card — each is an <a> linking to /produits/<slug>
    const productLinks = page.locator('a[href^="/produits/"]');
    await expect(productLinks.first()).toBeVisible();
  });

  test('"Voir tous nos produits" navigates to /produits', async ({ page }) => {
    await page.goto('/');

    const cta = page.getByRole('link', { name: /voir tous nos produits/i });
    await expect(cta).toBeVisible();

    await cta.click();
    await expect(page).toHaveURL('/produits');
  });

  test('footer is visible with bakery name and legal links', async ({
    page,
  }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Legal links must be present
    await expect(
      footer.getByRole('link', { name: /politique de confidentialité/i }),
    ).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /mentions légales/i }),
    ).toBeVisible();
  });
});
