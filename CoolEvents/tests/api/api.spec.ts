import { test, expect } from '@playwright/test';

test('get API test', async ({ request }) => {
  const response = await request.get('/todos/1');
  expect(response.status()).toBeLessThan(300)
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.title).toBe("delectus aut autem");
});

test('post API test', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
  });

  const body = await response.json();
  expect(response.status()).toBeLessThan(300);
  expect(body.title).toBe('foo');
});