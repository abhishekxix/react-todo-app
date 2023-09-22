module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	extends: ['airbnb', 'prettier'],
	env: {
		browser: true,
	},
	globals: {
		document: true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
};
