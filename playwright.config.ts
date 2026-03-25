import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";
try {
  process.loadEnvFile();
} catch {
  // .env file not present (e.g. in CI)
}

const previewWebServer: PlaywrightTestConfig["webServer"] = {
  command: "pnpm run preview", // run pnpm run build beforehand
  url: "http://localhost:4321/",
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

const dockerWebServer: PlaywrightTestConfig["webServer"] = {
  command:
    "docker build -t zfl-website . && docker run --rm -p 4321:8080 --name zfl-website zfl-website:latest",
  port: 4321,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

const webServer: PlaywrightTestConfig["webServer"] = process.env
  .PLAYWRIGHT_USE_DOCKER
  ? dockerWebServer
  : previewWebServer;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:4321/",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer,
});
