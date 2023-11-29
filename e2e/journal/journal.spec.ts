import { expect, test } from '@playwright/test';
import { teardown } from '../helper';
import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';
import { loadEnv } from 'vite';
import { USER } from '../auth.setup';

test.describe('Journal Page', () => {
  let testEnv: RulesTestEnvironment, firebase: firebase.firestore.Firestore;
  const user = { ...USER };

  test.beforeAll(async ({ request }) => {
    process.env = { ...process.env, ...loadEnv('', process.cwd()) };
    await request.post(
      'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/projects/demo-project-1234/accounts',
      {
        headers: {
          Authorization: 'Bearer owner',
        },
        data: {
          ...USER,
        },
      }
    );
  });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(user.email);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(user.password);
    await page.getByRole('button', { name: /^Login$/ }).click();
  });

  test('should render correctly', async ({ page }) => {
    const navMenu = page.getByText('Journal Dream App');
    const nameUser = page.getByText(user.displayName);
    const starIcon = page.getByTestId('StarOutlineIcon');
    const description = page.getByRole('heading', { name: 'Select or create your journal' });
    const homeButton = page.getByRole('button').first();
    const exitButton = page.getByRole('button').nth(1);
    const addButton = page.getByRole('main').getByRole('button');

    await expect(page).toHaveURL('http://localhost:5173/journal');
    await expect(navMenu).toBeVisible();
    await expect(nameUser).toBeVisible();
    await expect(starIcon).toBeVisible();
    await expect(description).toBeVisible();
    await expect(homeButton).toBeVisible();
    await expect(exitButton).toBeVisible();
    await expect(addButton).toBeVisible();
  });

  test('should add new journal when add button is clicked', async ({ page }) => {
    await page.getByRole('main').getByRole('button').click();
    await page.locator('#swal2-input').fill('New Test Title');
    await page.getByLabel('Create button').click();

    await expect(page.getByRole('button', { name: 'New Test Title' })).toBeVisible();
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