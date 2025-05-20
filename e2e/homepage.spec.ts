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

      // Wait for styles to be loaded
      await page.waitForLoadState("networkidle");
      await page.waitForSelector("header.bg-gray-800", { state: "attached" });

      await expect(page).toHaveTitle(/Home/);
      await expect(page.locator("h1")).toHaveText("Welcome to Our Site");

      // Check CSS is applied (after ensuring CSS is loaded)
      const color = await page
        .locator("header")
        .evaluate((el) => window.getComputedStyle(el).backgroundColor);
      console.log(`Background color on ${vp.name}: ${color}`);
      expect(color).toBe("rgb(31, 41, 55)"); // The bg-gray-800 color
    });
  }
});
