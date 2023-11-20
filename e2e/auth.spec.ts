import { expect, test } from '@playwright/test';

test.beforeEach('Open start URL', async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveURL('http://localhost:5173/auth/login');

  const header = page.getByRole('heading', { name: 'Login' });
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Password');
  const LoginButton = page.locator('div').filter({ hasText: /^Login$/ });
  const googleButton = page.locator('div').filter({ hasText: /^Google$/ });
  const createAccountLink = page.getByRole('link', { name: 'Create account' });

  expect(header).toBeTruthy();
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(LoginButton).toBeTruthy();
  expect(googleButton).toBeTruthy();
  expect(createAccountLink).toBeTruthy();
});
