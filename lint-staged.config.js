module.exports = {
	'src/**/*.{js,jsx}': 'eslint --fix',
	'*.{js,jsx,json}': 'prettier --write',
	'*.js': 'eslint --cache --fix',
	'*.{js,jsx}': 'prettier --write',
};
