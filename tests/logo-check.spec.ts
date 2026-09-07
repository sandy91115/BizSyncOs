import { test, expect } from '@playwright/test';

test('verify desktop sticky header and policy engine panel fonts', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(1000);
    
    // 1. Check initial header is visible at top 0
    const header = page.locator('.site-header');
    await expect(header).toBeVisible();
    const initialBox = await header.boundingBox();
    expect(initialBox?.y).toBe(0);
    
    // 2. Scroll down 800px and check header is still sticky at top 0
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    
    const scrolledBox = await header.boundingBox();
    expect(scrolledBox?.y).toBe(0);
    await expect(header).toBeVisible();
    
    // Screenshot sticky header when scrolled
    await page.screenshot({ path: 'test-results/sticky-header-scrolled.png', fullPage: false });
    
    // 3. Scroll to policy engine panel and screenshot
    const controlGrid = page.locator('.os-mockup-control-grid');
    await controlGrid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await controlGrid.screenshot({ path: 'test-results/policy-engine-panel.png' });
});