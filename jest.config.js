module.exports = {
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/node_modules/**',
      '!**/tests/**',
      '!**/coverage/**',
      '!jest.config.js',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    moduleNameMapper: {
      "@actions(.*)$": "<rootDir>/src/redux/actions$1",
      "@reducres(.*)$": "<rootDir>/src/redux/reducers$1",
      "@store(.*)$": "<rootDir>/src/redux/store$1",
      "@services(.*)$": "<rootDir>/src/services$1",
      "@constants(.*)$": "<rootDir>/src/constants$1",
      "@hooks(.*)$": "<rootDir>/src/hooks$1",
      "@util(.*)$": "<rootDir>/src/util$1"
    },
    setupFiles: [
      '<rootDir>/src/tests/setup.js',
    ],
    testMatch: [
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
      '/.next/',
      '/node_modules/',
      '/tests/',
      '/coverage/'
    ],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };