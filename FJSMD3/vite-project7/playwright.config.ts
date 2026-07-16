import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/system',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5179',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5179',
    url: 'http://127.0.0.1:5179',
    reuseExistingServer: !process.env.CI,
  },
})
