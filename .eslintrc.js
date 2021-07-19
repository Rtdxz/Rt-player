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
      ts: 'never'
    }],
    'import/no-unresolved': 0,
    'max-len': 'off',
    'no-param-reassign': 'off',
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off'
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
