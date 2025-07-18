import { test, expect } from '@playwright/test';
import { registerNewUser } from '../../utils.spec';

test.describe('/api/auth/logout', () => {
  test('revokes user session', async ({ request }) => {
    const credentials = await registerNewUser(request);

    await request.post('/api/auth/login', {
      data: credentials,
    });

    const res = await request.post('/api/auth/logout', {
      data: {},
    });

    expect(res.status()).toBe(204);

    const headers = res.headers();
    expect(headers['set-cookie']).toContain(
      '.AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=strict; httponly'
    );
    expect(headers['set-cookie']).toContain(
      'Identity.External=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax; httponly'
    );
    expect(headers['set-cookie']).toContain(
      'Identity.TwoFactorUserId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax; httponly'
    );
  });
});
