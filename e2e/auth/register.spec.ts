import { expect, test } from '@playwright/test';
import { setup, teardown } from '../helper';
import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';

test.describe('Register Page', () => {
  let testEnv: RulesTestEnvironment, firebase: firebase.firestore.Firestore;
  const registerValues = {
    displayName: 'Test Name',
    email: 'test@email.com',
    password: '123456',
  };

  test.beforeAll(async () => {
    ({ testEnv, firebase } = await setup(null, { withRules: true }));
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('auth/register');
  });

  test('should renders correctly', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/auth/register');

    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(page.getByText('Do you already have an account?')).toBeVisible();
  });

  test('should has the correct classes', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
    await expect(form).toHaveClass('animate__animated animate__fadeIn animate__faster');
  });

  test('should has the correct inputs', async ({ page }) => {
    const nameInput = page.getByLabel('Full Name');
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Password');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
  test('button should be disabled when the form is empty', async ({ page }) => {
    const signUpButton = page.getByRole('button', { name: /^Sign up$/ });

    await expect(signUpButton).toBeDisabled();
  });

  // ........

  test.describe('When the form is invalid', () => {
    test.describe('When Incorrect Name is filled', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel('Full Name').click();
        await page.getByLabel('Full Name').fill('1nc0rr3ct Nam3');
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('Correct@email.com');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('correctPassword');
        await page.getByLabel('Password').blur();
      });

      test('Login button should be disabled', async ({ page }) => {
        await expect(page.getByRole('button', { name: /^Sign up$/ })).toBeDisabled();
      });

      test('Error should be displayed', async ({ page }) => {
        await expect(page.getByText('Name should only have letters')).toBeVisible();

        await page.getByLabel('Full Name').click();
        await page.getByLabel('Full Name').fill('');

        await expect(page.getByText('Name is required')).toBeVisible();
      });
    });
    test.describe('When Incorrect email is filled', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel('Full Name').click();
        await page.getByLabel('Full Name').fill('Correct Name');
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('Incorrect Email');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('correctPassword');
        await page.getByLabel('Password').blur();
      });

      test('Login button should be disabled', async ({ page }) => {
        await expect(page.getByRole('button', { name: /^Sign up$/ })).toBeDisabled();
      });

      test('Error should be displayed', async ({ page }) => {
        await expect(page.getByText('Email is invalid')).toBeVisible();

        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('');

        await expect(page.getByText('Email is required')).toBeVisible();
      });
    });

    test.describe('When Incorrect password is filled', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel('Full Name').click();
        await page.getByLabel('Full Name').fill('Correct Name');
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('Correct@email.com');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('inc');
        await page.getByLabel('Password').blur();
      });

      test('Buttons should be disabled', async ({ page }) => {
        await expect(page.getByRole('button', { name: /^Sign up$/ })).toBeDisabled();
      });

      test('Error should be displayed', async ({ page }) => {
        await expect(page.getByText('Password is too short')).toBeVisible();

        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('');

        await expect(page.getByText('Password is required')).toBeVisible();
      });
    });
  });

  test.describe('When the form is valid', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel('Full Name').click();
      await page.getByLabel('Full Name').fill(registerValues.displayName);
      await page.getByLabel('Email').click();
      await page.getByLabel('Email').fill(registerValues.email);
      await page.getByLabel('Password').click();
      await page.getByLabel('Password').fill(registerValues.password);
      await page.getByLabel('Password').blur();
    });

    test('Button should be enabled', async ({ page }) => {
      await expect(page.getByRole('button', { name: /^Sign up$/ })).toBeEnabled();
    });

    test('Should redirect to journal page', async ({ page }) => {
      await page.getByRole('button', { name: /^Sign up$/ }).click();

      const navMenu = page.getByText('Journal Dream App');
      const nameUser = page.getByText(registerValues.displayName);

      await expect(page).toHaveURL('http://localhost:5173/journal');
      await expect(navMenu).toBeVisible();
      await expect(nameUser).toBeVisible();
    });
  });

  test.afterEach(async () => {
    firebase.clearPersistence();
    testEnv.clearFirestore();
  });

  test.afterAll(async ({ request }) => {
    request.delete('http://127.0.0.1:9099/emulator/v1/projects/demo-project-1234/accounts');

    await teardown(testEnv);
  });
});
