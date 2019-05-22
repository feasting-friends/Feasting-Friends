
  module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: 'airbnb',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 0,
      'no-debugger': 0,
      'no-alert': 0,
      'no-console': 0,
    }, 
};

