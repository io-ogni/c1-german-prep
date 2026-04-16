import { test, expect } from '@playwright/test';

test.describe('Public pages load', () => {
  test('landing page renders hero and features', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('The Real Deutsch C1');
    await expect(page.locator('text=Start learning')).toBeVisible();
    // 6 feature boxes
    await expect(page.locator('text=telc C1 Prüfungsvorbereitung')).toBeVisible();
    await expect(page.locator('text=IT Deutsch')).toBeVisible();
  });

  test('login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('signup page renders', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Registrieren' })).toBeVisible();
  });

  test('about page renders with back button', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('About C1 Werkstatt');
    await expect(page.locator('text=Back to home').or(page.locator('text=Startseite'))).toBeVisible();
  });

  test('datenschutz page renders all sections', async ({ page }) => {
    await page.goto('/datenschutz');
    await expect(page.locator('h1')).toContainText('Datenschutzerklärung');
    await expect(page.locator('text=Welche Daten werden erhoben')).toBeVisible();
    await expect(page.getByText('Analytik (PostHog)')).toBeVisible();
    await expect(page.getByText('Fehlerverfolgung (Sentry)')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('landing page links to login and signup', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Start learning');
    await expect(page).toHaveURL(/signup/);
  });

  test('login page links to signup', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=Registrieren');
    await expect(page).toHaveURL(/signup/);
  });

  test('landing footer has legal links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer >> text=Datenschutz')).toBeVisible();
    await expect(page.locator('footer >> text=Impressum')).toBeVisible();
    await expect(page.locator('footer >> text=About this app')).toBeVisible();
  });
});

test.describe('Landing page content', () => {
  test('shows 100% free callout', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=100% free. No ads. No premium tier.')).toBeVisible();
  });

  test('shows companion disclaimer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=companion to your C1 preparation')).toBeVisible();
  });

  test('shows telc disclaimer in footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=telc is a registered trademark')).toBeVisible();
  });

  test('carousel has dot navigation', async ({ page }) => {
    await page.goto('/');
    const dots = page.locator('section >> button.rounded-full');
    await expect(dots.first()).toBeVisible();
  });
});

test.describe('Error handling', () => {
  test('404 page for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });

  test('protected routes redirect to login', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/login|\/$/);
  });
});
