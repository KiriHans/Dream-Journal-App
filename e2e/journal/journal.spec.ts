import { expect, test } from '@playwright/test';

test.describe('Journal Page', () => {
  const user = {
    displayName: 'Test subject',
    email: '123@123.com',
    password: 'Test123456',
    id: 'test',
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
    await page.getByLabel('Title *').fill('New Test Title');
    await page.getByRole('button', { name: 'Create!' }).click();

    await expect(page.getByRole('button', { name: 'New Test Title' })).toBeVisible();
  });

  test.afterEach(async ({ request }) => {
    await request.delete(
      'http://127.0.0.1:9099/emulator/v1/projects/demo-project-1234/databases/(default)/documents'
    );
  });

  test.afterAll(async ({ request }) => {
    await request.delete('http://127.0.0.1:9099/emulator/v1/projects/demo-project-1234/accounts');
  });
});
