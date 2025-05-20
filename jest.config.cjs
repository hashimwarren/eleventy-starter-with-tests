module.exports = {
  testEnvironment: "node",
  transform: {},
  passWithNoTests: true,
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/e2e/"],
  // Look for tests in the test directory
  testMatch: ["**/test/**/*.test.js"],
};
