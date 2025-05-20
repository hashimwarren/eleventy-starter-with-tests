import { describe, expect, test } from '@jest/globals';
import { formatDate, truncate } from '../../../src/assets/js/utils.js';

describe('Utils', () => {
  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2025-05-18');
      expect(formatDate(date)).toBe('May 18, 2025');
    });
  });

  describe('truncate', () => {
    test('returns original string if shorter than max length', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    test('truncates string if longer than max length', () => {
      expect(truncate('Hello, world!', 5)).toBe('Hello...');
    });
  });
}); truncate } from "../src/assets/js/utils.js";

describe("Utils", () => {
  describe("formatDate", () => {
    test("formats date correctly", () => {
      const date = new Date("2025-05-18");
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
