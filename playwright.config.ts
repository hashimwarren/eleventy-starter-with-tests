import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Start Eleventy dev server before running tests
  webServer: {
    command: "npm run build && node e2e/setup.js && npx @11ty/eleventy --serve",
    url: "http://localhost:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:8080",
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
});
