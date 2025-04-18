import { test, expect } from '@playwright/test';

test('Search field functionality', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`); // Navigate to testing page

    const searchField = page.getByRole('textbox', { name: 'Search' });

    await expect(searchField).toBeVisible();

    await searchField.click();
    await expect(searchField).toBeFocused(); // Ensure it got focus on click

    await searchField.fill('winter');
    await expect(searchField).toHaveValue('winter');

    await searchField.fill('');
    await expect(searchField).toHaveValue('');

    await expect(searchField).toBeVisible(); // Field itself is still there

    await context.close();
})
