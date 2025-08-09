import config from 'productive-eslint'

export default config({ ignores: ['**/generated/**'] }).override(
  'antfu/typescript/rules',
  {
    languageOptions: { parserOptions: { projectService: true } },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          filter: {
            match: false,
            regex: 'baseURL',
          },
          format: ['strictCamelCase'],
          selector: 'default',
        },
        {
          format: ['strictCamelCase', 'StrictPascalCase'],
          selector: 'import',
        },
        {
          format: ['StrictPascalCase'],
          selector: ['enum', 'class'],
        },
        {
          format: ['UPPER_CASE'],
          selector: ['enumMember'],
        },
        {
          format: ['StrictPascalCase'],
          prefix: ['I'],
          selector: ['interface'],
        },
        {
          format: ['StrictPascalCase'],
          prefix: ['T'],
          selector: ['typeAlias'],
        },
        {
          format: ['StrictPascalCase'],
          selector: ['typeParameter'],
        },
        {
          format: ['strictCamelCase', 'UPPER_CASE', 'StrictPascalCase'],
          modifiers: ['const'],
          selector: 'variable',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          modifiers: ['unused'],
          selector: 'parameter',
        },
      ],
    },
  },
)
