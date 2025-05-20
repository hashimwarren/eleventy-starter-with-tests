import { test, expect } from "@playwright/test";

// Validate mobile, tablet, desktop
const viewports = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

test.describe("Homepage", () => {
  for (const vp of viewports) {
    test(`should display correctly on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:8080");

      // Wait for page to be fully loaded
      await page.waitForLoadState("networkidle");
      
      // Basic structure tests
      await expect(page).toHaveTitle(/Homepage|Eleventy/i);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      
      // Navigation links
      await expect(page.locator("header a[href='/']")).toBeVisible();
      await expect(page.locator("header a[href='/about/']")).toBeVisible();
    });
  }
});
