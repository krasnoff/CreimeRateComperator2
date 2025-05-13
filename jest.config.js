module.exports = {
  // testEnvironment: 'node',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Maps @/ to the root directory
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};