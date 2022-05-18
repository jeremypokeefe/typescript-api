module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
    createDefaultProgram: true
  },
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".js"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "prettier/prettier": ["warn"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/no-non-null-assertion": 0,
    "no-console": 1
  }
};
