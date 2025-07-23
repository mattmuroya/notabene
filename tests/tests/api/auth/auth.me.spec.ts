import { test, expect } from '@playwright/test';
import { registerNewUser } from '../../utils.spec';

test.describe('POST: /api/auth/me', () => {
  test('returns currently authorized user', async ({ request }) => {
    const { id, email } = await registerNewUser(request);

    const res = await request.get('/api/auth/me');

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('id', id);
    expect(body).toHaveProperty('email', email);
  });

  test('returns 401 if no authorized user', async ({ request }) => {
    const res = await request.get('/api/auth/me');

    expect(res.status()).toBe(401);
  });
});
