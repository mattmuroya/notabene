import { APIRequestContext, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

export const registerNewUser = async (
  request: APIRequestContext,
  email: string = '',
  password: string = ''
): Promise<{ email: string; password: string; id: string }> => {
  email = email ? email : `user+${randomUUID()}@example.com`;
  password = password ? password : '1234qwer!@#$QWER';

  const res = await request.post('/api/auth/register', {
    data: { email, password },
  });

  if (res.ok()) {
    const body = await res.json();
    return {
      email,
      password,
      id: body.id,
    };
  }

  throw new Error('New user registration failed');
};

export const loginUser = async (
  request: APIRequestContext,
  email: string,
  password: string
): Promise<void> => {
  const res = await request.post('/api/auth/login', {
    data: { email, password },
  });

  if (!res.ok()) throw new Error('User login failed');
};

export const logoutUser = async (request: APIRequestContext): Promise<void> => {
  const res = await request.post('/api/auth/logout', {
    data: {},
  });

  if (!(res.ok() || res.status() == 401)) throw new Error('User logout failed');
};
