module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    "vue"
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      // vue: 'never',
      ts:'never'
    }],
    // 'import/no-unresolved': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    // 'space-before-function-paren': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js'
      },

    }
  },

};
