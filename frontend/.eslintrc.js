module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
};

