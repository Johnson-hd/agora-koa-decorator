module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
