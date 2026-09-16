import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1024, 1440]) {
    test(`homepage content fits at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        await expect(page.locator('.os-pro-stage')).toBeVisible();

        for (const selector of ['.os-pro-window-title', '.os-pro-stat-pill', '.os-ai-panel']) {
            const bounds = await page.locator(selector).evaluateAll(elements =>
                elements.map(element => {
                    const rect = element.getBoundingClientRect();
                    return { left: rect.left, right: rect.right };
                }),
            );
            for (const boundsItem of bounds) {
                expect(boundsItem.left).toBeGreaterThanOrEqual(-1);
                expect(boundsItem.right).toBeLessThanOrEqual(width + 1);
            }
        }

        const map = page.locator('.os-mockup-version .os-event-map');
        await expect(page.locator('.os-mockup-version .os-event-connectors')).toBeVisible();
        await map.evaluate(element => { element.scrollLeft = element.scrollWidth; });
        const actionIsReachable = await map.evaluate(element => {
            const action = element.querySelector('.os-event-actions')!.getBoundingClientRect();
            const region = element.getBoundingClientRect();
            return action.right <= region.right + 1 && action.left >= region.left - 1;
        });
        expect(actionIsReachable).toBe(true);
    });
}
