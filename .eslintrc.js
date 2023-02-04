module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'arrow-body-style': 'off',
    // allowForLoopAfterthoughts: true,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
  },
};
