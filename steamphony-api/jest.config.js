module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,ts}',
  ],
  moduleNameMapper: {
    '^@atoms/(.*)$': '<rootDir>/../Steam web/src/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/../Steam web/src/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/../Steam web/src/organisms/$1',
    '^@layouts/(.*)$': '<rootDir>/../Steam web/src/layouts/$1',
    '^@hooks/(.*)$': '<rootDir>/../Steam web/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/../Steam web/src/utils/$1',
    '^@styles/(.*)$': '<rootDir>/../Steam web/src/styles/$1',
  },
}; 