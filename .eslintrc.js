const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  plugins: ['prettier'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-debugger': 'error',
    'eol-last': 1,
    'prettier/prettier': ['error', prettierOptions],
    'no-confusing-arrow': 0,
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-mixed-operators': 0,
    'no-await-in-loop': 1,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'quote-props': 0,
    'prefer-template': 2,
    'max-len': [
      1,
      100,
      2,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
      },
    ],
    'import/no-cycle': 1,
    'global-require': 2,
    'consistent-return': 0,
    'object-curly-newline': ['error', { consistent: true }],
    indent: 0,
    'prefer-promise-reject-errors': 0,
    'react/no-unknown-property': ['error', { ignore: ['class'] }],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '[A-Z]',
          match: true,
        },
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
