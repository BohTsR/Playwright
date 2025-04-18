import { test, expect } from '@playwright/test';

test('Negative search', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`); // Navigate to testing page

    const trackListElement = page.locator('#tracklist'); // CSS collector element
    await expect(trackListElement).toBeInViewport();

    const searchField = page.getByRole('textbox', { name: 'Search' });

    await expect(searchField).toBeInViewport();
    await searchField.fill('nonexistenttrack123'); // Fill with a term that shouldn't match anything

    await expect(trackListElement).toHaveCount(1); // Ensure no results are shown
    const noResulTest = await trackListElement.innerText()
    expect(noResulTest).toBe('Not found')

    await context.close();
})
