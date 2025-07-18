import { APIRequestContext } from '@playwright/test';
import { randomUUID } from 'crypto';

export const registerNewUser = async (
  request: APIRequestContext,
  email: string = '',
  password: string = ''
): Promise<{ email: string; password: string }> => {
  email = email ? email : `user+${randomUUID()}@example.com`;
  password = password ? password : '1234qwer!@#$QWER';

  const res = await request.post('/api/auth/register', {
    data: { email, password },
  });

  if (res.ok()) return { email, password };

  throw new Error('New user registration failed');
};
