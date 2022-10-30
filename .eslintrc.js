module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // These rules don't add much value, are better covered by TypeScript and good definition files
    'react/no-direct-mutation-state': 'off',
    'react/no-deprecated': 'off',
    'react/no-string-refs': 'off',
    'react/require-render-return': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ], // also want to use with ".tsx"
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        // reservedFirst: true,
      },
    ],
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'app/**/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'pages/**/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'entities/**/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'shared/**/*',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '**/*.module.scss',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'arrow-parens': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {blankLine: 'always', prev: '*', next: 'return'},
      {blankLine: 'always', prev: 'import', next: 'export'},
      {blankLine: 'always', prev: 'directive', next: '*'},
      {blankLine: 'any', prev: 'directive', next: 'directive'},
      {blankLine: 'always', prev: ['case', 'default'], next: '*'},
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {'@typescript-eslint/parser': ['.ts', '.tsx']},
    'import/resolver': {
      // typescript: {
      //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
      //   moduleDirectory: ['node_modules', 'src/'],
      // },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        map: [
          ['^setupTests$', './setupTests'],
          ['shared', './src/shared'],
          ['pages', './src/pages'],
          ['app', './src/app'],
          ['entities', './src/entities'],
        ],
      },
    },
  },
};
