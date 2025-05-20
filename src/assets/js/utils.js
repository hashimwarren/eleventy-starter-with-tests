/**
 * Simple utility functions for demonstration purposes
 */

/**
 * Format a date in the format "Month Day, Year"
 * @param {Date} date - The date to format
 * @returns {string} The formatted date
 */
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Add timeZone option
  });
}

/**
 * Truncate a string to a maximum length, adding an ellipsis if truncated
 * @param {string} str - The string to truncate
 * @param {number} maxLength - The maximum length
 * @returns {string} The truncated string
 */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
