import { test, expect } from '@playwright/test';
import { registerNewUser } from '../../utils.spec';

test.describe('/api/auth/login', () => {
  test('logs in existing user and sends cookie', async ({ request }) => {
    const credentials = await registerNewUser(request);
    const res = await request.post('/api/auth/login', {
      data: credentials,
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('id', credentials.id);
    expect(body).toHaveProperty('email', credentials.email);

    const headers = res.headers();
    expect(headers).toHaveProperty('set-cookie');
    expect(headers['set-cookie']).toContain('.AspNetCore.Identity.Application');
  });

  test('rejects missing email', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { password: '1234qwer!@#$QWER' },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Email: ['The Email field is required.'],
    });
  });

  test('rejects malformed email', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: 'bad.email', password: '1234qwer!@#$QWER' },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Email: ['The Email field is not a valid e-mail address.'],
    });
  });

  test('rejects email not found in db', async ({ request }) => {
    const email = 'nonexistent.user@example.com';
    const password = 'Qwerty1234!';

    const res = await request.post('/api/auth/login', {
      data: { email, password },
    });

    expect(res.status()).toBe(401);

    const body = await res.json();
    expect(body).toHaveProperty('errors', ['Invalid username or password.']);
  });

  test('rejects missing password', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: 'goodemail@example.com' },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors', {
      Password: ['The Password field is required.'],
    });
  });

  test('rejects wrong password', async ({ request }) => {
    const credentials = await registerNewUser(request);
    const res = await request.post('/api/auth/login', {
      data: { email: credentials.email, password: 'WrongPassword1234!' },
    });

    expect(res.status()).toBe(401);

    const body = await res.json();
    expect(body).toHaveProperty('errors', ['Invalid username or password.']);
  });
});
