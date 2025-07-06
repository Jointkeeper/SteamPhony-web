import nodePlugin from 'eslint-plugin-node';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      node: nodePlugin,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
    },
  },
]; 