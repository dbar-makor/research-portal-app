export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ASSETS_URL = process.env.REACT_APP_ASSETS_URL + '/';

export const END_POINT = {
	AUTH: '/auth',
	PUBLICATION: '/publication',
	FILE: '/file',
	CONTRACT: '/contract',
	SUBSCRIPTION: '/subscription',
	COMPANY: '/company',
	CATEGORIES: '/category',
	ALLCATEGORIES: '/categories',
	UTILS: '/utils',
	USER: '/user',
	UPGRADE: '/upgrade',
	ASSETS: '/assets',
	INVOICE: '/invoice',
	PROSPECT: '/prospect',
	COMMENT: '/comment',
	PUBLISH: '/publish',
	SETTINGS: '/settings',
	EVENT: '/event',
};

export const storageKeys = {
	userToken: 'token',
	userContent: 'content',
};
