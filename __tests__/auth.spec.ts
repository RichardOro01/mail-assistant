import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('Redirect to login', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Login/i);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Render login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('Bad email', async ({ page }) => {
    await page.getByLabel('Email').pressSequentially('bad-email');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid email')).toBeVisible();
  });

  test('Required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('Invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').pressSequentially('bad-email@avangenio.com');
    await page.getByLabel('Password').pressSequentially('bad-password');
    const button = page.getByRole('button', { name: 'Login' });
    await button.click();
    await expect(page.getByText('Invalid credentials.').first()).toBeVisible({ timeout: 10000 });
  });

  test('Valid credentials', async ({ page }) => {
    if (!process.env.TEST_EMAIL || !process.env.TEST_PASSWORD) {
      throw new Error('Missing test email or password');
    }
    await page.getByLabel('Email').pressSequentially(process.env.TEST_EMAIL);
    await page.getByLabel('Password').pressSequentially(process.env.TEST_PASSWORD);
    const button = page.getByRole('button', { name: 'Login' });
    await button.click();
    await page.waitForURL('/mail/list', { timeout: 10000 });
  });
});
