/* eslint-disable */
module.exports = {
  displayName: 'history',
  preset: './jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]s$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/apps/history',
};
