import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [ "dist/"]
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["jest.config.js"], // Apply only to Jest config files
    languageOptions: { globals: globals.node }, // Allow Node.js globals like `module`
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/*.test.[jt]s?(x)","**/*.spec.[jt]s?(x)"],
    languageOptions: { globals: globals.jest },
    plugins: { jest: pluginJest },
    rules: pluginJest.configs.recommended.rules,
  }
];