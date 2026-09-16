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
  await expect(page.getByRole('heading', { name: 'Forgot your password?' })).toBeVisible();
  await page.getByRole('button', { name: 'Send reset link' }).click();
  await expect(page.getByRole('alert')).toHaveText('Please enter your email address.');
  await page.screenshot({ path: 'test-results/forgot-password.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: 'Send reset link' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/forgot-password-mobile.png', fullPage: true });
});

test('reset link keeps its token and shows the new design and mismatch validation', async ({ page }) => {
  await page.goto(`${authOrigin}/reset-password/invalid-regression-token?email=someone%40example.invalid`);
  await expect(page.getByRole('heading', { name: 'Set a new password' })).toBeVisible();
  await expect(page.getByLabel('Work Email')).toHaveValue('someone@example.invalid');
  await page.getByLabel('New password', { exact: true }).fill('New-Password123!');
  await page.getByLabel('Confirm new password').fill('different');
  await page.getByRole('button', { name: 'Reset password', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('Passwords do not match.');
  await expect(page).toHaveURL(/reset-password\/invalid-regression-token\?email=/);
  await page.screenshot({ path: 'test-results/reset-password.png', fullPage: true });
  await page.getByLabel('Confirm new password').fill('New-Password123!');
  const submitted = page.waitForRequest(r => r.url() === `${authOrigin}/reset-password` && r.method() === 'POST');
  await page.getByRole('button', { name: 'Reset password', exact: true }).click();
  expect((await submitted).postDataJSON()).toMatchObject({ token: 'invalid-regression-token', email: 'someone@example.invalid' });
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Request a new reset link' })).toBeVisible();
});
