module.exports = {
	env: {
		node: true,
		es2021: true,
		browser: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:import/recommended',
		'plugin:import/react',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		'react': {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx'],
			},
		},
	},
	plugins: ['unused-imports', 'react', 'unused-imports'],
	rules: {
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'no-empty': [
			'error',
			{
				allowEmptyCatch: true,
			},
		],
		'no-duplicate-imports': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'error',
		'no-unreachable-loop': 'error',
		'no-use-before-define': 'error',
		'no-multiple-empty-lines': 'error',
		'no-trailing-spaces': 'error',
		'require-await': 'error',
		'no-var': 'error',
		'no-labels': 'error',
		'no-inline-comments': 'error',
		'eqeqeq': 'error',
		'no-console': 'warn',
		'no-mixed-spaces-and-tabs': 0,
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false,
			},
		],
		'arrow-parens': ['error', 'always'],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: [
					'import',
					'let',
					'const',
					'var',
					'return',
					'throw',
					'if',
					'for',
					'switch',
					'continue',
					'break',
					'class',
					'do',
					'try',
					'export',
					'function',
					'while',
					'block',
				],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['singleline-let', 'singleline-const', 'singleline-var'],
				next: ['singleline-let', 'singleline-const', 'singleline-var'],
			},
			{
				blankLine: 'any',
				prev: 'import',
				next: 'import',
			},
			{
				blankLine: 'always',
				prev: '*',
				next: [
					'return',
					'throw',
					'if',
					'for',
					'switch',
					'continue',
					'break',
					'class',
					'do',
					'try',
					'export',
					'function',
					'while',
					'block',
				],
			},
		],

		'react/prop-types': 'off',
		'react/jsx-fragments': 'error',
		'react/destructuring-assignment': ['error', 'never'],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-pascal-case': 'error',
		'react/jsx-props-no-multi-spaces': 'error',
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true,
			},
		],
		'react/jsx-wrap-multilines': [
			'error',
			{
				declaration: 'parens-new-line',
				assignment: 'parens-new-line',
				return: 'parens-new-line',
				arrow: 'parens-new-line',
				condition: 'parens-new-line',
				logical: 'parens-new-line',
			},
		],
		'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
		'react/jsx-sort-props': ['error', { callbacksLast: true, noSortAlphabetically: true }],
		'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
		'react/jsx-no-script-url': 'error',
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-closing-bracket-location': 'error',
		'react/jsx-boolean-value': ['error', 'never'],
		'react/void-dom-elements-no-children': 'error',
		'react/style-prop-object': 'error',
		'react/jsx-curly-spacing': ['error', { when: 'never', children: { when: 'never' } }],
		'react/display-name': ['warn', { ignoreTranspilerName: true }],
		'react/button-has-type': 'error',
		'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/no-deprecated': ['error'],
		'react/no-danger-with-children': ['error'],
		'react/no-unescaped-entities': ['error'],
		'react/no-unknown-property': ['error'],
		'react/jsx-handler-names': ['error', { eventHandlerPrefix: false }],
		'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true }],
		'react/jsx-max-depth': ['error', { max: 15 }],
		'react/jsx-no-duplicate-props': ['error'],
		'react/no-children-prop': ['error'],

		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@/**',
						group: 'external',
						position: 'after',
					},
				],
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
			},
		],
		'import/default': ['error'],
		'import/no-absolute-path': ['error'],
		'import/no-self-import': ['error'],
		'import/no-cycle': ['error'],
		'import/no-useless-path-segments': ['error'],
		'import/export': ['error'],
		'import/no-deprecated': ['error'],
		'import/no-mutable-exports': ['warn'],
		'import/no-unused-modules': ['error'],
		'import/no-amd': ['error'],
		'import/no-nodejs-modules': ['error'],
		'import/first': ['error'],
		'import/exports-last': ['warn'],
		'import/no-duplicates': ['error'],
		'import/newline-after-import': ['error'],
		'import/no-named-default': ['error'],
		'import/no-anonymous-default-export': ['warn'],
	},
};
