import { test, expect } from '@playwright/test';

test('Add track by plus button', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`); //Navigate to testing page

    const addButton = (rowIndex: number) => ( 
        page.locator(`div.MuiGrid-container:nth-child(${rowIndex}) > button:nth-child(4)`)
    );

    const playlist = page.locator('#playlist .MuiGrid-container');

    await expect(playlist).toBeHidden();

    await addButton(1).click();
    await page.getByText('Your playlist').isVisible();
    await expect(playlist).toHaveCount(1);

    const firstRow = await  page.locator('div.MuiGrid-container:nth-child(1)').textContent();
    const firstRowPlaylist = await page.locator('#playlist > div:nth-child(1) > div:nth-child(2)').textContent();

    const firstRowText = firstRow!.substring(0, 5);
    const firstRowPlaylistText = firstRowPlaylist!.substring(0, 5);

    expect(firstRowText).toBe(firstRowPlaylistText); //Comparing title in the rows

    await addButton(2).nth(1).click();

    await context.close();
})

test('Add multiple traks by check button', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${process.env.PLAYWRIGHT_BASE_URI}`); //Navigate to testing page

    for(let i = 1; i<5; i++){
        const checkButton = page.locator(`div.MuiGrid-container:nth-child(${i}) > div:nth-child(1)`).nth(0);
        await checkButton.click()
    }

    await page.getByRole('button', { name: 'Add' }).click();
    const playlistContainer = page.locator('#playlist .MuiGrid-container');
    await expect(playlistContainer).toHaveCount(4);

    for(let i = 2; i<6; i++){
        const checkButton = page.locator(`div.MuiGrid-container:nth-child(${i}) > div:nth-child(1)`).nth(1);
        await checkButton.click()
    }

    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(playlistContainer).toBeHidden();
    await page.getByText('No tracks on playlist').isVisible();

    await context.close();
})