import { test as setup } from '@playwright/test';
import { execSync } from 'child_process';

setup('Reset test database', async () => {
  execSync('dotnet run --project ../tools/DbResetter', { stdio: 'inherit' });
});
