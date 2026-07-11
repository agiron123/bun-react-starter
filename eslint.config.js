import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";

const parserOptions = {
  requireConfigFile: false,
  babelOptions: {
    plugins: [
      ["@babel/plugin-syntax-typescript", { allExtensions: true, isTSX: true }],
      "@babel/plugin-syntax-jsx",
    ],
  },
};

export default [
  {
    ignores: ["**/dist/**", "dist", "bun.lockb", "eslint.config.js", "prettier.config.js", "**/*.d.ts"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        Bun: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-constant-binary-expression": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": "off",
    },
  },
  prettierConfig,
];
