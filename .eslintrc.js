module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'quotes': ['warn', 'single'],
        // note you must disable the base rule as it can report incorrect errors
        'semi': 'off',
        '@typescript-eslint/semi': ['error'], // semicolon at the end of line (just
        // like in Java) )
        '@typescript-eslint/no-inferrable-types': 'off'
    }
};
