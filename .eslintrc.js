module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx"],
      env: {
        jest: true,
      },
    },
  ],
};
