import {test , APIRequestContext, expect} from "@playwright/test";

let apiContext: APIRequestContext;

test.beforeAll(async ({playwright}) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
});

test.afterAll(async () => {
    await apiContext.dispose();
});
test('API context test', async ({ page}) => {
 
    const response = await apiContext.get('/todos/1');
    expect(response.status()).toBeLessThan(300);
    expect(response.headers()['content-type']).toContain('application/json');

    await page.goto('http://localhost:5200/');
    const aboutUs = page.locator('#about-us');
    await expect(aboutUs).toContainText('About Us');

    
});