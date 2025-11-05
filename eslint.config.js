import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'

export default [
  {
    files: ['**/*.{ts,js,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Vue 3 rules
      ...vue.configs['vue3-recommended'].rules,

      // TypeScript rules
      ...tseslint.configs.recommended.rules,

      // Custom rules
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // 🧹 Prettier compatibility (disables conflicting rules)
  prettier,

  // Optional overrides for specific file types
  {
    files: ['*.vue'],
    rules: {
      'vue/html-self-closing': 'off',
    },
  },
]
