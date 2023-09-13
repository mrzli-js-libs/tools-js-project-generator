import { GenerateInput } from '../../../../types';
import { isAppNestTemplate } from '../../../../util';

export function getScripts(input: GenerateInput): Record<string, string> {
  if (isAppNestTemplate(input)) {
    return getScriptsNest();
  }

  return getScriptsPublished();
}

function getScriptsNest(): Record<string, string> {
  return {
    build: 'shx rm -rf ./dist && nest build',
    format: 'prettier --write .',
    start: 'nest start',
    'start:dev': 'nest start --watch',
    'start:debug': 'nest start --debug --watch',
    'start:prod': 'node dist/src/main',
    lint: 'eslint --report-unused-disable-directives --fix .',
    test: 'jest',
    'test:debug':
      'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
    'test:e2e': 'jest --config ./test/jest-e2e.json',
  };
}

function getScriptsPublished(): Record<string, string> {
  return {
    dev: 'ts-node src/index.ts',
    lint: 'eslint --report-unused-disable-directives --fix . && prettier --write .',
    'lint:nofix':
      'eslint --report-unused-disable-directives . && prettier --check .',
    'test-only': 'jest --passWithNoTests',
    test: 'pnpm run lint && pnpm run test-only',
    'build-only': 'shx rm -rf ./dist && tsc --project tsconfig.lib.json',
    build: 'pnpm run test && pnpm run build-only',
    'pub-only': 'npmpub',
    pub: 'pnpm run build && pnpm run pub-only',
  };
}
