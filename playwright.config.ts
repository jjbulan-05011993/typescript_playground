import { defineConfig, devices } from '@playwright/test';
import { loadYAMLEnv } from './src/utils/loadYAMLEnv';

const env = loadYAMLEnv();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 10000,

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        headless: !env.webdriver_visible,
        channel: 'chrome', // Google Chrome
      },
    },
    {
      name: 'Edge',
      use: {
        ...devices['Desktop Edge'],
        headless: !env.webdriver_visible,
        channel: 'msedge', // Microsoft Edge
      },
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari'],
        headless: !env.webdriver_visible,
      },
    },
  ],
});