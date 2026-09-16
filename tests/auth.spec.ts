import { test, expect } from '@playwright/test';

test('invalid credentials are posted and keep the user on the frontend login', async ({ page }) => {
  await page.route('**/auth/csrf-token', route => route.fulfill({ json: { token: 'test-csrf' } }));
  let submitted: unknown;
  await page.route('http://127.0.0.1:9000/login', async route => {
    submitted = route.request().postDataJSON();
    expect(route.request().method()).toBe('POST');
    expect(route.request().headers()['x-csrf-token']).toBe('test-csrf');
    await route.fulfill({ status: 422, json: { errors: { email: ['These credentials do not match our records.'] } } });
  });
  await page.goto('/login');
  await page.getByLabel('Work Email').fill('unknown@example.test');
  await page.getByLabel('Password', { exact: true }).fill('random-password');
  await page.getByRole('button', { name: 'Sign In to Workspace' }).click();
  await expect(page.getByRole('alert')).toHaveText('These credentials do not match our records.');
  expect(submitted).toMatchObject({ email: 'unknown@example.test', password: 'random-password' });
  await expect(page).toHaveURL('http://127.0.0.1:4173/login');
});

test('Google sign-in errors appear on the frontend login', async ({ page }) => {
  await page.goto('/login?error=Google+sign-in+was+cancelled.');
  await expect(page.getByRole('alert')).toHaveText('Google sign-in was cancelled.');
});
