import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-native/no-inline-styles': 'warn',
    },
  },
];
