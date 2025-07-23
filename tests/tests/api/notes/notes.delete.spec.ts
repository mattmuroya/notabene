import { test, expect } from '@playwright/test';
import { logoutUser, registerNewUser } from '../../utils.spec';

test.describe('DELETE: /api/notes/:id', () => {
  test('deletes note created by authenticated user', async ({ request }) => {
    await registerNewUser(request);

    const title = 'Hello, World!';
    const content = "It's dangerous to go alone! Take this.";

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const { id } = await createRes.json();
    const res = await request.delete(`api/notes/${id}`);

    expect(res.status()).toBe(204);

    const getRes = await request.get('/api/notes');
    const getBody = await getRes.json();
    expect(getBody).toHaveLength(0);
  });

  test('rejects deleting note with no authenticated user', async ({
    request,
  }) => {
    await registerNewUser(request);

    const title = 'Hello, World!';
    const content = "It's dangerous to go alone! Take this.";

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    await logoutUser(request);

    const { id } = await createRes.json();
    const res = await request.delete(`api/notes/${id}`);

    expect(res.status()).toBe(401);
  });

  test('returns 404 if wrong authenticated user', async ({ request }) => {
    await registerNewUser(request);

    const title = 'Hello, World!';
    const content = "It's dangerous to go alone! Take this.";

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    await registerNewUser(request);

    const { id } = await createRes.json();
    const res = await request.delete(`api/notes/${id}`);

    expect(res.status()).toBe(404);
  });

  test('returns 404 if note does not exist', async ({ request }) => {
    await registerNewUser(request);

    const title = 'Hello, World!';
    const content = "It's dangerous to go alone! Take this.";

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const { id } = await createRes.json();
    await request.delete(`api/notes/${id}`);
    const res = await request.delete(`api/notes/${id}`);

    expect(res.status()).toBe(404);
  });
});
