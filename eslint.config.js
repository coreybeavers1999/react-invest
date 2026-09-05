import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react,
    },
    rules: {
      'react/jsx-first-prop-new-line': ['error', 'multiprop'],
      'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    }
  },
])
