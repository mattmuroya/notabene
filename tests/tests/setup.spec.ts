import { expect, test as setup } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

setup('Reset test database', async ({ request }) => {
  console.log('Running setup project...');

  const projectPath = path.join(__dirname, '../../tools/DbResetter');
  execSync(`dotnet run --project ${projectPath}`, {
    stdio: 'inherit',
  });

  console.log('Clearing database connection pools...\n');
  const res = await request.post('/api/test/reset-connections');

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty(
    'message',
    'Database connection pools cleared successfully.'
  );

  console.log(body.message);
});
