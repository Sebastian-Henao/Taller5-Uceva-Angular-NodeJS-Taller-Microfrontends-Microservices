module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageReporters: ["html", "json", "lcov", "text", "text-summary", "clover"],
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/**/*.spec.ts",
    "!src/app/interfaces/**",
    "!src/app/mocks/**"
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],

  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  clearMocks: true,
  testMatch: ["**/*.spec.ts"],
  rootDir: './'
};