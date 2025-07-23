import { test, expect } from '@playwright/test';
import { logoutUser, registerNewUser } from '../../utils.spec';

test.describe('PUT: /api/notes/:id', () => {
  test('updates an existing note created by authenticated user', async ({
    request,
  }) => {
    const { userId } = await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const updatedTitle = 'Updated Note';
    const updatedContent = 'Goodbye, World!';

    const { id } = await createRes.json();
    const res = await request.put(`/api/notes/${id}`, {
      data: { title: updatedTitle, content: updatedContent },
    });

    expect(res.status()).toBe(200);

    const note = await res.json();
    expect(note).toHaveProperty('title', updatedTitle);
    expect(note).toHaveProperty('content', updatedContent);
    expect(note).toHaveProperty('userId', userId);
  });

  test('rejects update if no authenticated user', async ({ request }) => {
    await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    await logoutUser(request);

    const updatedTitle = 'Updated Note';
    const updatedContent = 'Goodbye, World!';

    const { id } = await createRes.json();
    const res = await request.put(`/api/notes/${id}`, {
      data: { title: updatedTitle, content: updatedContent },
    });

    expect(res.status()).toBe(401); // Unauthorized for no auth cookie
  });

  test('returns 404 if wrong authenticated user', async ({ request }) => {
    await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    await registerNewUser(request);

    const updatedTitle = 'Updated Note';
    const updatedContent = 'Goodbye, World!';

    const { id } = await createRes.json();
    const res = await request.put(`/api/notes/${id}`, {
      data: { title: updatedTitle, content: updatedContent },
    });

    expect(res.status()).toBe(404); // Not Found for wrong authenticated user
  });

  test('rejects updating if note does not exist', async ({ request }) => {
    await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const { id } = await createRes.json();

    await request.delete(`/api/notes/${id}`);

    const updatedTitle = 'Updated Note';
    const updatedContent = 'Goodbye, World!';

    const res = await request.put(`/api/notes/${id}`, {
      data: { title: updatedTitle, content: updatedContent },
    });

    expect(res.status()).toBe(404);
  });

  test('defaults title to empty string if missing', async ({ request }) => {
    await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const updatedContent = 'Goodbye, World!';

    const { id } = await createRes.json();
    const res = await request.put(`/api/notes/${id}`, {
      data: { content: updatedContent },
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('title', '');
    expect(body).toHaveProperty('content', updatedContent);
  });

  test('defaults content to empty string if missing', async ({ request }) => {
    await registerNewUser(request);

    const title = 'New Note';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const updatedTitle = 'Updated Note';

    const { id } = await createRes.json();
    const res = await request.put(`/api/notes/${id}`, {
      data: { title: updatedTitle },
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('title', updatedTitle);
    expect(body).toHaveProperty('content', '');
  });
});
