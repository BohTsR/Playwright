import { test, expect } from '@playwright/test';

test('Positive search', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`); //Navigate to testing page

    const trackListElement = page.locator('#tracklist'); // CSS colector element
    await expect(trackListElement).toBeInViewport();

    const searchField = page.getByRole('textbox', { name: 'Search' });

    await expect(searchField).toBeInViewport();
    await searchField.fill('Summer');
    await expect(page.getByText('Summer Breeze')).toBeInViewport();

    await expect(trackListElement).toHaveCount(1); // Checking that we have only one row

    const visibleText = await trackListElement.first().innerText();
    expect(visibleText).not.toMatch(/Autumn|Winter|Spring|Rainy/); // Checking that result is correct

    await context.close();
})
