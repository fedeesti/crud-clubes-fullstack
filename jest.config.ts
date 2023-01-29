export default {
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
