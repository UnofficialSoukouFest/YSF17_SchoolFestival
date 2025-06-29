import { defineConfig, mergeConfig } from 'vitest/config'
import rootConfig from '../../vitest.config.js'
import path from 'node:path'

export default mergeConfig(
  rootConfig,
  defineConfig({
    test: {
      projects: [
        {
          include: ['test/**/*.unit.test.js', 'test/**/*.unit.test.ts'],
          name: 'unit',
        },
        {
          include: ['test/**/*.browser.test.js', 'test/**/*.browser.test.ts'],
          name: 'browser',
        },
      ],
      alias: {
        '@': path.resolve(import.meta.dirname, './'),
      },
    },
  }),
)
