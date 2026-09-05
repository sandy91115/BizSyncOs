import { expect, test } from '@playwright/test';

test('the BizSyncOS landing page communicates the product and supports key conversion interactions', async ({
    page,
}) => {
    await page.goto('/');

    await expect(
        page.getByRole('heading', {
            name: /run your entire business from one intelligent platform/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByText('ALL-IN-ONE BUSINESS OPERATING SYSTEM', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText('END-TO-END OPERATING FLOW', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: /automation executed/i }),
    ).toBeVisible();
    await expect(
        page.getByText(/built for growing businesses across industries/i),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /the tools your business uses, working as one/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Shopify connector' }),
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: /watch 2-min product tour/i }),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /your business should not run on disconnected tools/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByText('EVENT-DRIVEN BUSINESS OPERATING SYSTEM', {
            exact: true,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /every business event becomes an intelligent business action/i,
        }),
    ).toBeVisible();
    await expect(page.locator('.os-connected-map')).toBeVisible();
    await expect(page.locator('.os-event-core')).toContainText('BizSyncOS');
    await expect(page.locator('.os-event-core')).not.toContainText(
        'Live events',
    );
    await expect(
        page.getByText('Business health updated', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /every handoff moves from the same business signal/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByText('Customer updated', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText(
            /illustrative opportunity estimates from the demo workspace/i,
        ),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /ai that works like your business analyst/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', {
            name: /find revenue hiding inside everyday operations/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByRole('heading', { name: /why businesses choose bizsyncos/i }),
    ).toBeVisible();
    await expect(
        page.getByRole('columnheader', { name: 'BizSyncOS', exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText('Business health score', { exact: true }),
    ).toBeVisible();

    await page
        .getByRole('button', { name: 'Can AI perform actions automatically?' })
        .click();
    await expect(page.getByText(/authorised human approval/i)).toBeVisible();

    await expect(page.getByText('₹48,500', { exact: true })).toBeVisible();
    await expect(
        page.getByText('COD confirmation', { exact: true }),
    ).toBeVisible();

    await page
        .getByRole('button', { name: 'Pricing', exact: true })
        .first()
        .click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(
        page.getByRole('heading', {
            name: /simple, transparent pricing that grows with your business/i,
        }),
    ).toBeVisible();
    await page.getByRole('button', { name: /yearly save 20%/i }).click();
    await expect(page.getByText(/76,790/).first()).toBeVisible();
    await expect(page.getByLabel('Included').first()).toBeVisible();
    await expect(page.getByLabel('Not included').first()).toBeVisible();
});

test('marketing content routes render locally without a production CRM handoff', async ({
    page,
}) => {
    const routes: Array<[string, RegExp]> = [
        ['/product', /one system for the work that moves your business/i],
        ['/solutions', /connected operating model/i],
        [
            '/integrations',
            /connect the systems that keep your business moving/i,
        ],
        [
            '/pricing',
            /simple, transparent pricing that grows with your business/i,
        ],
        ['/docs', /build a connected business, one confident step at a time/i],
        ['/blog', /ideas for building a more connected business/i],
        ['/about', /built for teams who need the whole business/i],
        ['/contact', /tell us how your business works today/i],
    ];

    for (const [route, heading] of routes) {
        await page.goto(route);
        await expect(
            page.getByRole('heading', { name: heading }),
        ).toBeVisible();
        await expect(page).not.toHaveURL(/crm\.bizsyncos\.com/);
    }

    const legacyRoutes: Array<[string, string, RegExp]> = [
        [
            '/features',
            '/product',
            /one system for the work that moves your business/i,
        ],
        [
            '/compare',
            '/why-bizsyncos',
            /business software should make the business easier to run/i,
        ],
    ];
    for (const [legacyRoute, canonicalRoute, heading] of legacyRoutes) {
        await page.goto(legacyRoute);
        await expect(page).toHaveURL(new RegExp(`${canonicalRoute}$`));
        await expect(
            page.getByRole('heading', { name: heading }),
        ).toBeVisible();
    }
});

test('the documentation portal makes the operational guide searchable and actionable', async ({
    page,
}) => {
    await page.goto('/docs');

    await expect(
        page.getByRole('heading', {
            name: /build a connected business, one confident step at a time/i,
        }),
    ).toBeVisible();
    await expect(
        page.getByText('01 / COMPANY SETUP', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByText('05 / BUSINESS COPILOT', { exact: true }),
    ).toBeVisible();

    const search = page.getByLabel('Search BizSyncOS documentation');
    await search.fill('automation');
    await expect(
        page.getByRole('button', { name: /design safe automations/i }),
    ).toBeVisible();
    await page
        .getByRole('button', { name: /design safe automations/i })
        .click();
    await expect(
        page.getByRole('heading', {
            name: /automate repeatable work\. keep people in control/i,
        }),
    ).toBeVisible();

    await page
        .getByRole('button', {
            name: /why did an automation stop at approval/i,
        })
        .click();
    await expect(
        page.getByText(/high-impact actions are intentionally held/i),
    ).toBeVisible();
});

test('login and signup routes use the React frontend before secure backend handoff', async ({
    page,
}) => {
    await page.goto('/login');
    await expect(page).toHaveURL('http://127.0.0.1:4173/login');
    await expect(page.getByRole('heading', { name: /sign in and pick up where your business left off/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Continue with email & password' })).toHaveAttribute('href', 'http://127.0.0.1:9000/login');

    await page.goto('/signup');
    await expect(page).toHaveURL('http://127.0.0.1:4173/signup');
    await expect(page.getByRole('heading', { name: /start your 3-day bizsyncos full-product demo/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create account with email' })).toHaveAttribute('href', 'http://127.0.0.1:9000/register');
});

test('the main navigation has explicit login and live-demo conversion paths', async ({
    page,
}) => {
    await page.goto('/');

    await page
        .getByRole('button', { name: /try live demo/i })
        .first()
        .click();
    await expect(page).toHaveURL(/127\.0\.0\.1:9000\/.+\/dashboard$/);

    await page.goto('/');
    await page.getByRole('button', { name: 'Resources' }).click();
    const resourceMenu = page.locator('.resource-menu');
    await expect(
        resourceMenu.getByRole('button', { name: /documentation/i }),
    ).toBeVisible();
    await expect(
        resourceMenu.getByRole('button', { name: /talk to sales/i }),
    ).toBeVisible();
});

test('desktop navigation reveals Product and Resources menus on hover', async ({
    page,
}) => {
    await page.goto('/');

    await page
        .locator('.desktop-nav')
        .getByRole('button', { name: 'Product', exact: true })
        .hover();
    await expect(
        page.locator('.product-menu').getByRole('button', {
            name: /business overview/i,
        }),
    ).toBeVisible();
    await page
        .locator('.product-menu')
        .getByRole('button', { name: /business overview/i })
        .hover();
    await expect(page.locator('.product-menu')).toBeVisible();

    await page
        .locator('.desktop-nav')
        .getByRole('button', { name: 'Resources', exact: true })
        .hover();
    await expect(
        page.locator('.resource-menu').getByRole('button', {
            name: /documentation/i,
        }),
    ).toBeVisible();
    await page
        .locator('.resource-menu')
        .getByRole('button', { name: /documentation/i })
        .hover();
    await expect(page.locator('.resource-menu')).toBeVisible();
});

test('the local public frontend has no unhandled browser errors', async ({
    page,
}) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto('/');
    await expect(
        page.getByRole('heading', {
            name: /run your entire business from one intelligent platform/i,
        }),
    ).toBeVisible();
    await page.goto('/demo');
    await expect(
        page.getByRole('heading', { name: /explore the product before/i }),
    ).toBeVisible();

    expect(errors).toEqual([]);
});

test('AI Brain background video is loaded and playing', async ({ page }) => {
    await page.goto('/');
    await page.locator('.os-ai-video-background').waitFor();
    await page.locator('.os-intelligence-section').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const state = await page.locator('.os-ai-video-background').evaluate(
        (video: HTMLVideoElement) => ({
            currentSrc: video.currentSrc,
            currentTime: video.currentTime,
            readyState: video.readyState,
            error: video.error?.message ?? null,
        }),
    );

    expect(state.currentSrc).toContain('/images/bg.mp4');
    expect(state.error).toBeNull();
    expect(state.readyState).toBeGreaterThanOrEqual(2);
    expect(state.currentTime).toBeGreaterThan(0);
});

test('the dashboard screenshot section stays usable on a mobile viewport', async ({
    page,
}) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/product');

    const gallery = page.locator('#screens');
    await gallery.evaluate((element) =>
        element.scrollIntoView({ block: 'center' }),
    );
    await expect(
        gallery.getByRole('img', {
            name: 'Illustrative BizSyncOS Executive Command Center dashboard',
        }),
    ).toBeVisible();
    await expect(
        gallery.getByRole('img', {
            name: 'Illustrative BizSyncOS AI Business Brain screen',
        }),
    ).toBeVisible();
    await expect(
        gallery.getByRole('img', {
            name: 'Illustrative BizSyncOS connected operations dashboard',
        }),
    ).toBeVisible();
});
