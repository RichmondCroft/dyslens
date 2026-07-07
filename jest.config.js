module.exports = {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      setupFiles: ['jest-webextension-mock', '<rootDir>/test/wireStorageOnChanged.ts'],
      setupFilesAfterEnv: ['@testing-library/jest-dom'],
      testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/', '<rootDir>/build/'],
      moduleNameMapper: { '^~(.*)$': '<rootDir>/$1' },
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/e2e/**/*.test.ts'],
    },
  ],
};
