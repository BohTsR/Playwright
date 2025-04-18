import { test, expect } from '@playwright/test';

test('Calculate total playlist duration in seconds', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`);


    const durations = await page.locator('div.MuiGrid-container p:has-text(":")').allTextContents();
    const expectedTotal = durations.reduce((sum, time) => {
        const [min, sec] = time.split(':').map(Number);
        return sum + min * 60 + sec;
    }, 0);
 
   const addButtons = page.locator('div.MuiGrid-container button');
   const count = await addButtons.count();
   for (let i = 0; i < count; i++) {
        await addButtons.nth(i).click();
   }
 
   const totalSecondsLocator = page.getByText(/^\d+$/, { exact: false });
   await expect(totalSecondsLocator).toBeVisible();
 
   const displayedText = await totalSecondsLocator.textContent();
   const displayedTotal = parseInt(displayedText || '0');
 
   expect(displayedTotal).toBe(expectedTotal);
 
   await context.close();
});
