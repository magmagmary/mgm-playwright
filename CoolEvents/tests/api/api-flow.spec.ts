import {test , expect} from '@playwright/test';

test('API flow test', async ({ request }) => {
  const response = await request.get('/posts');
  const posts = await response.json();
  
  expect(posts.length).toBeGreaterThan(0);
  
  const firstPost = posts[0];

  const postResponse = await request.delete(`/posts/${firstPost.id}`);

  expect(postResponse.status()).toBe(200);
});