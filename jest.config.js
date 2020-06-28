const defaultConfig = {
  bail: true,
  testEnvironment: "node",
};

let overrideConfig = {};
switch (process.env.TEST_ENV) {
  case "unit":
    overrideConfig = {
      automock: true,
      clearMocks: true,
      resetMocks: true,
      restoreMocks: true,
      testMatch: ["**/__tests__/unit/**"],
      coverageThreshold: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: -10,
        },
      },
      collectCoverage: true,
      collectCoverageFrom: ["*.js", "src/**/*.js"],
      coverageDirectory: "coverage",
      coveragePathIgnorePatterns: [
        "./node_modules/",
        "./jest/",
        "jest.config.js",
        "__tests__",
      ],
      coverageReporters: ["json", "text", "lcov", "clover"],
    };
    break;
  case "integration":
    overrideConfig = {
      testMatch: ["**/__tests__/integration/**"],
    };
    break;
  default:
}

module.exports = { ...defaultConfig, ...overrideConfig };
