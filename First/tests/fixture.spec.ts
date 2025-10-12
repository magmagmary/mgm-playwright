import  { expect  , test , chromium} from "@playwright/test";

test('should hide the cookie banner' ,async({page})=>{
    await page.goto('https://www.udemy.com/');
    await page.getByRole('button', { name: 'OK', exact: true }).click();

    const banner = page.getByText('By clicking ”OK”, you agree');

    await expect(banner).toBeHidden();
});

test('should show the cookie banner' ,async({page})=>{
    await page.goto('https://www.udemy.com/');
    const banner = page.getByText('By clicking ”OK”, you agree');

    await expect(banner).toBeVisible();
});

test('browser fixture' ,async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.udemy.com/');
});

test('create page manually' ,async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.udemy.com/');
});