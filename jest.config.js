/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true, // clear calls of a mock
  resetMocks: true, // resets mocks between tests
  restoreMocks: true, // reset modules back to their orgiinal state between tests
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
};
