import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**', '!src/**/*.story.tsx', '!src/story/*.{tsx,mdx,ts}'],
    },
    tsconfigPath: './tsconfig.json',
  },
  lib: [
    {
      bundle: false,
      format: 'esm',
      dts: true,
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
})
