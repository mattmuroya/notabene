import { test, expect } from '@playwright/test';
import { loginUser, logoutUser, registerNewUser } from '../../utils.spec';

test.describe('GET: /api/notes/', () => {
  test('retrieves list of notes created by authenticated user', async ({
    request,
  }) => {
    const notes = [
      { title: 'Note 1', content: 'Hello, World!' },
      { title: 'Note 2', content: "It's dangerous to go alone! Take this." },
      { title: 'Note 3', content: 'One does not simply walk into Mordor.' },
    ];

    await registerNewUser(request);

    for (const data of notes) {
      await request.post('/api/notes', {
        data,
      });
    }

    const res = await request.get('/api/notes');

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(3);
    for (const note of notes) {
      expect(
        body.some(
          (n: { title: string; content: string }) =>
            n.content == note.content && n.title == note.title
        )
      );
    }
  });

  test('does not retrieve notes create by other user', async ({ request }) => {
    const notes1 = [
      { title: 'Note 1', content: 'Hello, World!' },
      { title: 'Note 2', content: "It's dangerous to go alone! Take this." },
      { title: 'Note 3', content: 'One does not simply walk into Mordor.' },
    ];

    const notes2 = [
      { title: 'Note 1', content: 'Goodbye, World!' },
      { title: 'Note 2', content: 'Our princess is in another castle!' },
      { title: 'Note 3', content: 'But what about second breakfast?' },
    ];

    const { email: email1, password: password1 } =
      await registerNewUser(request);
    for (const data of notes1) {
      await request.post('/api/notes', { data });
    }

    const { email: email2, password: password2 } =
      await registerNewUser(request);
    for (const data of notes2) {
      await request.post('/api/notes', { data });
    }

    await loginUser(request, email1, password1);
    const res1 = await request.get('/api/notes');

    expect(res1.status()).toBe(200);

    const body = await res1.json();
    expect(body).toHaveLength(3);
    for (const note of notes1) {
      expect(
        body.some(
          (n: { title: string; content: string }) =>
            n.content == note.content && n.title == note.title
        )
      ).toBe(true);
    }
    for (const note of notes2) {
      expect(
        body.some(
          (n: { title: string; content: string }) =>
            n.content == note.content && n.title == note.title
        )
      ).toBe(false);
    }

    await loginUser(request, email2, password2);
    const res2 = await request.get('/api/notes');

    expect(res2.status()).toBe(200);

    const body2 = await res2.json();
    expect(body2).toHaveLength(3);
    for (const note of notes2) {
      expect(
        body2.some(
          (n: { title: string; content: string }) =>
            n.content == note.content && n.title == note.title
        )
      ).toBe(true);
    }
    for (const note of notes1) {
      expect(
        body2.some(
          (n: { title: string; content: string }) =>
            n.content == note.content && n.title == note.title
        )
      ).toBe(false);
    }
  });

  test('retrieves an empty list if user has no notes', async ({ request }) => {
    const notes = [
      { title: 'Note 1', content: 'Hello, World!' },
      { title: 'Note 2', content: "It's dangerous to go alone! Take this." },
      { title: 'Note 3', content: 'One does not simply walk into Mordor.' },
    ];

    await registerNewUser(request);
    for (const data of notes) {
      await request.post('/api/notes', { data });
    }

    await registerNewUser(request);

    const res = await request.get('/api/notes');

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(0);
  });
});

test.describe('GET: /api/notes/:id', () => {
  test('retrieves single note created by authenticated user', async ({
    request,
  }) => {
    await registerNewUser(request);

    const title = 'Note 1';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const note = await createRes.json();
    const res = await request.get(`/api/notes/${note.id}`);

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('title', title);
    expect(body).toHaveProperty('content', content);
  });

  test('rejects retrieving note if no authentication', async ({ request }) => {
    await registerNewUser(request);

    const title = 'Note 1';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const note = await createRes.json();

    await logoutUser(request);

    const res = await request.get(`/api/notes/${note.id}`);

    expect(res.status()).toBe(401); // Unauthorized due to route protection
  });

  test('rejects retrieving note if wrong authenticated user', async ({
    request,
  }) => {
    await registerNewUser(request);

    const title = 'Note 1';
    const content = 'Hello, World!';

    const createRes = await request.post('/api/notes', {
      data: { title, content },
    });

    const note = await createRes.json();

    await registerNewUser(request);
    const res = await request.get(`/api/notes/${note.id}`);

    expect(res.status()).toBe(404); // Not Found if authentication present but wrong user
  });
});
