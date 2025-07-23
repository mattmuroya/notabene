import { test, expect } from '@playwright/test';
import { logoutUser, registerNewUser } from '../../utils.spec';

test.describe('POST: /api/notes/', () => {
  test('creates new note associated with authenticated user', async ({
    request,
  }) => {
    const { id: userId } = await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const res = await request.post('/api/notes', {
      data: { title, content },
    });

    expect(res.status()).toBe(201);

    const note = await res.json();
    expect(note).toHaveProperty('title', title);
    expect(note).toHaveProperty('content', content);
    expect(note).toHaveProperty('userId', userId);
  });

  test('rejects creating note without authorization', async ({ request }) => {
    await logoutUser(request); // Just to be sure no residual cookie

    const title = 'New Note';
    const content = 'Hello, World!';

    const res = await request.post('/api/notes', {
      data: { title, content },
    });

    expect(res.status()).toBe(401);
  });

  test('defaults missing title to empty string', async ({ request }) => {
    const { id: userId } = await registerNewUser(request);

    const content = 'Hello, World!';
    const res = await request.post('/api/notes', {
      data: { content },
    });

    expect(res.status()).toBe(201);

    const note = await res.json();
    expect(note).toHaveProperty('title', '');
    expect(note).toHaveProperty('content', content);
    expect(note).toHaveProperty('userId', userId);
  });

  test('defaults missing content to empty string', async ({ request }) => {
    const { id: userId } = await registerNewUser(request);

    const title = 'New Note';
    const res = await request.post('/api/notes', {
      data: { title },
    });

    expect(res.status()).toBe(201);

    const note = await res.json();
    expect(note).toHaveProperty('title', title);
    expect(note).toHaveProperty('content', '');
    expect(note).toHaveProperty('userId', userId);
  });
});
