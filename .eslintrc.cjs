/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      // Serverless functions, DB layer, and one-off scripts run in Node, not
      // the browser — they need `process`/`Buffer`/etc. recognized.
      files: ['api/**/*.js', 'db/**/*.js', 'scripts/**/*.mjs', 'drizzle.config.js'],
      env: { node: true }
    }
  ]
}
