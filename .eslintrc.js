module.exports = {
  env: {
    browser: false,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    CardService: 'readonly',
    PropertiesService: 'readonly',
    GmailApp: 'readonly',
    Gmail: 'readonly',
    Logger: 'readonly',
    UrlFetchApp: 'readonly',
    Utilities: 'readonly',
    Session: 'readonly',
    Browser: 'readonly',
    SpreadsheetApp: 'readonly',
    ScriptApp: 'readonly',
    HtmlService: 'readonly',
    global: 'writable'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'import/extensions': 'off',
    'max-len': ['error', { code: 120 }],
    'no-redeclare': ['error', { builtinGlobals: false }]
  }
}; 