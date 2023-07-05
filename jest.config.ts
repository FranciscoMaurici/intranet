/** Official documentation
 * line:10 {@see https://stackoverflow.com/questions/69227566/consider-using-the-jsdom-test-environment}
 * line:19 {@see https://nextjs.org/docs/testing#setting-up-jest-with-babel}
 * line:28:39 {@see https://gist.github.com/rishitells/3c4536131819cff4eba2c8ab5bbb4570}
 */

// ModuleNameMapper updated based on: https://stackoverflow.com/questions/55488882/modulenamemapper-settings-in-jest-config-js-doesnt-work-on-circleci

import { pathsToModuleNameMapper } from 'ts-jest'
import type { JestConfigWithTsJest } from 'ts-jest/dist/types'

import { compilerOptions } from './tsconfig.json'

const config: JestConfigWithTsJest = {
  globals: { 'ts-jest': { tsconfig: 'tsconfig.test.json' } },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/stories/',
    '<rootDir>/src/__tests__/app-test-utils.js',
    '<rootDir>/src/__tests__/router-mock.js',
    '<rootDir>/src/__tests__/api-mock.ts',
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  collectCoverageFrom: ['src/**/*.(js|jsx|ts|tsx)', '!**/node_modules/**'],
  coverageReporters: ['html', 'text', 'text-summary'],
}

export default config
