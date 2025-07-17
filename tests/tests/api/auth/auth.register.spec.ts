import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

test.describe('/api/auth/register', () => {
  test('registers new user', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = '1234qwer!@#$QWER!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body).toHaveProperty('message', 'Registration successful.');
  });

  test('rejects duplicate email', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = '1234qwer!@#$QWER!';

    await request.post('/api/auth/register', {
      data: { email, password },
    });

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(409);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      `Username '${email}' is already taken.`,
      `Email '${email}' is already taken.`,
    ]);
  });

  test('rejects missing email', async ({ request }) => {
    const password = '1234qwer!@#$QWER!';

    const res = await request.post('/api/auth/register', {
      data: { password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Email: ['The Email field is required.'],
    });
  });

  test('rejects malformed email', async ({ request }) => {
    const email = 'malformed.email.com';
    const password = 'Qwerty1234!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Email: ['The Email field is not a valid e-mail address.'],
    });
  });

  test('rejects missing password', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;

    const res = await request.post('/api/auth/register', {
      data: { email },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Password: ['The Password field is required.'],
    });
  });

  test('rejects password less than 8 characters', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = 'Qw1!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      'Passwords must be at least 8 characters.',
    ]);
  });

  test('rejects password without uppercase letter', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = 'qwerty1234!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      "Passwords must have at least one uppercase ('A'-'Z').",
    ]);
  });

  test('rejects password without lowercase letter', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = 'QWERTY1234!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      "Passwords must have at least one lowercase ('a'-'z').",
    ]);
  });

  test('rejects password without number', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = 'QwertyQwerty!';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      "Passwords must have at least one digit ('0'-'9').",
    ]);
  });

  test('rejects password without special character', async ({ request }) => {
    const email = `user+${randomUUID()}@example.com`;
    const password = 'Qwerty1234';

    const res = await request.post('/api/auth/register', {
      data: { email, password },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', [
      'Passwords must have at least one non alphanumeric character.',
    ]);
  });
});
