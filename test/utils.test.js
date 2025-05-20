import { formatDate, truncate } from "../src/assets/js/utils.js";

describe("Utils", () => {
  describe("formatDate", () => {
    test("formats date correctly", () => {
      // Ensure the date is parsed as UTC to avoid timezone issues
      const date = new Date(Date.UTC(2025, 4, 18)); // Month is 0-indexed (4 for May)
      expect(formatDate(date)).toBe("May 18, 2025");
    });
  });

  describe("truncate", () => {
    test("returns original string if shorter than max length", () => {
      expect(truncate("Hello", 10)).toBe("Hello");
    });

    test("truncates string if longer than max length", () => {
      expect(truncate("Hello, world!", 5)).toBe("Hello...");
    });
  });
});
