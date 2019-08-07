module.exports = {
  'moduleFileExtensions': [
    'js',
    'json',
    'ts',
  ],
  "setupFiles": ["../test/test-scripts/setup.ts"],
  'rootDir': 'src',
  'testRegex': '.spec.ts$',
  'transform': {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  'coverageDirectory': '../coverage',
  'testEnvironment': 'node',
  'coverageReporters': ['clover'],
  'reporters': ['default', 'jest-simple-summary'],
  'coverageThreshold': {
    'global': {
      'branches': 70,
      'functions': 70,
      'lines': 70,
      'statements': -10,
    },
  },
  "collectCoverageFrom": [
    "!**/node_modules/*",
    "!**/vendor/**",
    "!**/test/**",
    "!**/*spec.ts",
    "src/**/*.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!main.ts"
  ],
  "coveragePathIgnorePatterns": ["repository.ts", "node_modules", "dist"]
};
