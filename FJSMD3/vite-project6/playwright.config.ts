import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/system',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5177',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5177',
    url: 'http://127.0.0.1:5177',
    reuseExistingServer: !process.env.CI,
  },
})