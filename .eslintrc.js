module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  globals: {
    process: true,
  },
  rules: {
    // "no-unused-vars": [
    //   "error",
    //   {
    //     args: "none", // do not check unused function arguments
    //   },
    // ],
    "no-async-promise-executor": "off",
    // 'no-console': 'error',
  },
};
