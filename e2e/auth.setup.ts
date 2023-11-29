import { test as setup } from '@playwright/test';
import { loadEnv } from 'vite';

const authFile = 'playwright/.auth/user.json';
export const USER = {
  displayName: 'Test subject',
  email: '123@123.com',
  password: 'Test123456',
  id: 'test',
};

setup('authenticate', async ({ request }) => {
  process.env = { ...process.env, ...loadEnv('', process.cwd()) };

  await request.storageState({ path: authFile });
  console.log('request', request);
});
