// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', '"plugin:prettier/recommended"'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
    quotes: ['error', 'single'],
  },
  ignorePatterns: ['/dist/*'],
};
