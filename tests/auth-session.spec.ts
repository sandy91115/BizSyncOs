import { test, expect } from '@playwright/test';

const authOrigin = process.env.AUTH_TEST_ORIGIN;
test.skip(!authOrigin, 'Set AUTH_TEST_ORIGIN to a running Laravel server.');

test('real session reaches password validation without third-party cookies', async ({ page }) => {
  await page.goto(`${authOrigin}/login`);
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign In to Workspace' }).click();
  await expect(page.getByText('Please enter your email address.')).toBeVisible();
  await expect(page.getByText('Please enter your password.')).toBeVisible();
  await page.getByLabel('Work Email').fill('nonexistent-auth-regression@example.invalid');
  await page.getByLabel('Password', { exact: true }).fill('Incorrect-Password123!');
  const response = page.waitForResponse(r => r.url() === `${authOrigin}/login` && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Sign In to Workspace' }).click();
  expect((await response).status()).toBe(422);
  await expect(page.getByRole('alert')).toContainText('credentials');
  await expect(page).toHaveURL(`${authOrigin}/login`);
  await page.screenshot({ path: 'test-results/login-validation.png', fullPage: true });
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await expect(page.getByRole('button', { name: 'Email password reset link' })).toBeVisible();
});
