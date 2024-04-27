import { getEsLintConfigs } from '@gmjs/eslint-config';

export default [
  {
    ignores: [
      'dist/',
      'eslint.config.mjs',
      'jest.config.ts',
      'postcss.config.js',
      'tailwind.config.js',
      'vite.config.ts',
    ],
  },
  ...getEsLintConfigs({ projectType: 'node' }),
];
