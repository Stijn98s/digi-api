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
  'coverageThreshold': {
    'global': {
      'branches': 80,
      'functions': 80,
      'lines': 80,
      'statements': -10,
    },
  },
  "collectCoverageFrom": [
    "!**/node_modules/*",
    "!**/vendor/**",
    "!**/test/**",
    "!**/*spec.ts",
    "**/*.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!main.ts",
    "!**/src/utils/seedData/**",
  ],
  'coveragePathIgnorePatterns': ['repository.ts', 'node_modules', 'dist'],
};
