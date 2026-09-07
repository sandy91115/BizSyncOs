import { expect, test } from '@playwright/test';

const VIEWPORTS = [
    { name: 'Mobile-Small-360', width: 360, height: 640 },
    { name: 'Mobile-iPhone-390', width: 390, height: 844 },
    { name: 'Mobile-Android-412', width: 412, height: 915 },
    { name: 'Tablet-iPad-768', width: 768, height: 1024 },
    { name: 'Laptop-1024', width: 1024, height: 768 },
    { name: 'Desktop-1440', width: 1440, height: 900 },
];

const ROUTES = [
    '/',
    '/solutions',
    '/docs',
    '/product',
    '/pricing',
    '/integrations',
    '/why-bizsyncos',
    '/blog',
    '/about',
    '/contact',
    '/login',
    '/signup',
];

for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
        test.use({ viewport: { width: vp.width, height: vp.height } });

        for (const route of ROUTES) {
            test(`Route ${route} has zero horizontal overflow and renders properly`, async ({
                page,
            }) => {
                await page.goto(route);
                await page.waitForTimeout(300);

                // Verify that page has no horizontal overflow
                const scrollWidth = await page.evaluate(
                    () => document.documentElement.scrollWidth,
                );
                const clientWidth = await page.evaluate(
                    () => document.documentElement.clientWidth,
                );

                expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px margin for sub-pixel rendering
            });
        }

        if (vp.width <= 768) {
            test(`Mobile navigation drawer opens and functions on ${vp.name}`, async ({
                page,
            }) => {
                await page.goto('/');
                const hamburger = page.locator('.mobile-menu');
                await expect(hamburger).toBeVisible();

                // Open drawer
                await hamburger.click();
                const mobileNav = page.locator('.mobile-nav');
                await expect(mobileNav).toBeVisible();

                // Navigate to Solutions via drawer
                const solutionsBtn = mobileNav.getByRole('button', {
                    name: 'Solutions',
                });
                await expect(solutionsBtn).toBeVisible();
                await solutionsBtn.click();
                await expect(page).toHaveURL(/\/solutions$/);

                // Open drawer again and navigate to Docs
                await hamburger.click();
                const docsBtn = page.locator('.mobile-nav').getByRole('button', {
                    name: 'Documentation',
                });
                await expect(docsBtn).toBeVisible();
                await docsBtn.click();
                await expect(page).toHaveURL(/\/docs$/);
            });

            test(`Documentation search and tabs work smoothly on ${vp.name}`, async ({
                page,
            }) => {
                await page.goto('/docs');
                const searchInput = page.getByPlaceholder(
                    /search modules, dashboards/i,
                );
                await expect(searchInput).toBeVisible();
                await searchInput.fill('Inventory');
                await page.waitForTimeout(300);

                // Verify search dropdown appears with matching topic
                const result = page.getByText(/Run your core modules/i);
                await expect(result.first()).toBeVisible();
            });

            test(`Solutions interactive selector tabs work smoothly on ${vp.name}`, async ({
                page,
            }) => {
                await page.goto('/solutions');
                const qcommerceTab = page.getByRole('tab', {
                    name: /Quick Commerce/i,
                });
                await expect(qcommerceTab).toBeVisible();
                await qcommerceTab.click();
                await page.waitForTimeout(300);

                await expect(
                    page.getByText(/Quick Commerce, FMCG & Dark-Store Operations/i).first(),
                ).toBeVisible();
            });
        }
    });
}