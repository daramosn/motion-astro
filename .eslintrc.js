module.exports = {
  // ...
  extends: [
    // ...
    'plugin:astro/recommended'
  ],
  // ...
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // ... other Astro-specific rules
        'no-unused-vars': 'error' // Rule to disallow unused variables
      }
    }
    // ...
  ]
}
