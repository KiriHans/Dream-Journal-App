import { expect, test } from '@playwright/test';

test.describe('Login page', () => {
  const user = {
    displayName: 'Test subject',
    email: '123@123.com',
    password: 'Test123456',
  };

  test.beforeAll(async ({ request }) => {
    await request.post(
      'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/projects/demo-project-1234/accounts',
      {
        headers: {
          Authorization: 'Bearer owner',
        },
        data: {
          ...user,
        },
      }
    );
  });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login page renders correctly', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/auth/login');

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create account' })).toBeVisible();

    await expect(page.getByRole('button', { name: /^Login$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Google$/ })).toBeVisible();
  });

  test('Login form has the correct classes', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
    await expect(form).toHaveClass('animate__animated animate__fadeIn animate__faster');
  });

  test('Login form has the correct Inputs', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('Login button should be disabled when the form is empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: /^Login$/ })).toBeDisabled();
  });
  test('Google button should be enabled when the form is empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: /^Google$/ })).toBeEnabled();
  });

  test.describe('When the form is invalid', () => {
    test.describe('When Incorrect email is filled', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('Incorrect');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('correctPassword');
        await page.getByLabel('Password').blur();
      });

      test('Login button should be disabled', async ({ page }) => {
        await expect(page.getByRole('button', { name: /^Login$/ })).toBeDisabled();
      });

      test('Error should be displayed', async ({ page }) => {
        await expect(page.getByText('Email is invalid')).toBeVisible();

        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('');

        await expect(page.getByText('Email is required')).toBeVisible();
      });

      test.afterEach(async ({ page }) => {
        await page.goto('/');
      });
    });
    test.describe('When Incorrect password is filled', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('Correct@email.com');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('inc');
        await page.getByLabel('Password').blur();
      });

      test('Buttons should be disabled', async ({ page }) => {
        await expect(page.getByRole('button', { name: /^Login$/ })).toBeDisabled();
      });

      test('Error should be displayed', async ({ page }) => {
        await expect(page.getByText('Password is too short')).toBeVisible();

        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('');

        await expect(page.getByText('Password is required')).toBeVisible();
      });

      test.afterEach(async ({ page }) => {
        await page.goto('/');
      });
    });
  });

  test.describe('When the form is valid', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel('Email').click();
      await page.getByLabel('Email').fill(user.email);
      await page.getByLabel('Password').click();
      await page.getByLabel('Password').fill(user.password);
      await page.getByLabel('Password').blur();
    });

    test('Buttons should be enabled', async ({ page }) => {
      const LoginButton = page.getByRole('button', { name: /^Login$/ });
      const googleButton = page.getByRole('button', { name: /^Google$/ });

      await expect(LoginButton).toBeEnabled();
      await expect(googleButton).toBeEnabled();
    });

    test('Should redirect to journal page', async ({ page }) => {
      await page.getByRole('button', { name: /^Login$/ }).click();

      const navMenu = page.getByText('Journal Dream App');
      const nameUser = page.getByText(user.displayName);

      await expect(page).toHaveURL('http://localhost:5173/journal');
      await expect(navMenu).toBeVisible();
      await expect(nameUser).toBeVisible();
    });
  });
});
