import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import globals from "globals";
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
    ignores: ["dist", "build", "node_modules", "bun.lockb", "**/*.d.ts"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions,
      globals: {
        ...globals.node,
        Bun: true,
      },
    },
    rules: {
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
