const config = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,ts}',
    '<rootDir>/**/__tests__/**/*.{js,ts}',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.ts',
    '!tailwind.config.ts',
    '!postcss.config.mjs',
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};

module.exports = config;