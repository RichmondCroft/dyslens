module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-webextension-mock', '<rootDir>/test/wireStorageOnChanged.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/', '<rootDir>/build/'],
  moduleNameMapper: { '^~(.*)$': '<rootDir>/$1' },
};
