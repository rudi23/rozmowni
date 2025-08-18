const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
    // Base configuration for all files
    js.configs.recommended,

    // Global configuration
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                // Node.js globals
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                console: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',

                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                atob: 'readonly',
                btoa: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                clearTimeout: 'readonly',
                fetch: 'readonly',

                // React globals
                React: 'readonly',
            },
        },
    },

    // Next.js specific configuration
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@next/next': nextPlugin,
            import: importPlugin,
        },
        rules: {
            // Next.js specific rules
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'error',
            '@next/next/no-sync-scripts': 'error',
            '@next/next/no-unwanted-polyfillio': 'error',

            // Allow unused variables in React components (they might be used in JSX)
            'no-unused-vars': ['warn', { 
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],

            // Custom rules
            'no-underscore-dangle': [2, { allow: ['__', '_getWhyUs'] }],
            'global-require': 'off',
            'quotes': ['warn', 'single', { avoidEscape: true }],
            
            // React-specific rules
            'react/jsx-uses-react': 'off', // Not needed in React 17+
            'react/react-in-jsx-scope': 'off', // Not needed in React 17+
            'import/exports-last': 'error',
            'import/extensions': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/no-unresolved': ['warn'],
            'import/order': [
                'error',
                {
                    'newlines-between': 'never'
                }
            ],
            'no-irregular-whitespace': [
                'error',
                {
                    skipComments: false,
                    skipRegExps: false,
                    skipStrings: false,
                    skipTemplates: false
                }
            ],
            'no-plusplus': [
                'error',
                {
                    allowForLoopAfterthoughts: true
                }
            ],
            'no-use-before-define': [
                'error',
                {
                    classes: true,
                    functions: false,
                    variables: true
                }
            ],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return'
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'export'
                },
                {
                    blankLine: 'any',
                    prev: 'export',
                    next: 'export'
                }
            ],
            'prefer-destructuring': 'off',
            'prefer-promise-reject-errors': 'off',
            'react/no-unescaped-entities': 'off'
        }
    },

    // Prettier configuration (must be last)
    prettierConfig,

    // Ignore patterns (replaces .eslintignore)
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'public/libs/**',
            'dist/**',
            'build/**',
            'coverage/**',
            '*.config.js',
            '*.config.mjs'
        ]
    },

    // Configuration for Node.js files (CommonJS)
    {
        files: ['app.js', '.release-it.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                console: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
            },
        },
        rules: {
            // Stricter rules for utility files
            'no-unused-vars': ['error', { 
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                caughtErrorsIgnorePattern: '^_'
            }],
        },
    },
    
    // Configuration for utility and service files (ES modules)
    {
        files: ['src/utils/**/*.js', 'src/services/**/*.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            // Stricter rules for utility files
            'no-unused-vars': ['error', { 
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                caughtErrorsIgnorePattern: '^_'
            }],
        },
    },

    // Configuration for API files (ES modules)
    {
        files: ['src/pages/api/**/*.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
    },

    // Configuration for React components (more lenient with unused vars)
    {
        files: ['src/components/**/*.js', 'src/pages/**/*.js', 'src/hooks/**/*.js'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...reactPlugin.configs.flat.recommended.rules,
            ...reactPlugin.configs.flat['jsx-runtime'].rules,
            ...reactHooksPlugin.configs['recommended-latest'].rules,
            'react/no-children-prop': 'off',
            'react/jsx-curly-brace-presence': [
                'error',
                { props: 'never' }
            ],
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/no-unused-prop-types': 'off',
            'react/require-default-props': 'off',
            'react/no-unescaped-entities': 'off',
            // More lenient for React components where imports might be used in JSX
            'no-unused-vars': ['warn', { 
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                caughtErrorsIgnorePattern: '^_'
            }],
        },
    },
    
    // Configuration for browser-only files
    {
        files: ['src/services/metadata/updateMetada.js'],
        languageOptions: {
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
            },
        },
    }
];
