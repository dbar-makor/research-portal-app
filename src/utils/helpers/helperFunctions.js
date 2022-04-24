export const setParams = (offset, limit, search, type, status) => {
	const params = new URLSearchParams();

	if (offset !== null && offset !== undefined && limit !== null && limit !== undefined) {
		params.append('limit', limit);
		params.append('offset', offset);
	}

	if (search !== undefined && search !== null && search !== '') {
		params.append('search', search);
	}

	if (type !== undefined && type !== null && type !== '' && type !== 'all') {
		params.append('type', type);
	}

	if (status !== undefined && status !== null && status !== '' && status !== 'all') {
		params.append('status', status);
	}

	const request = {
		params,
		paramsSerializer: (params) => {
			let result = '';

			for (const [key, value] of params) {
				result += `${key}=${encodeURIComponent(value)}&`;
			}

			return result.substr(0, result.length - 1);
		},
	};

	return request;
};

export const setParamsPublication = (offset, limit, id) => {
	const params = new URLSearchParams();

	if (
		offset !== null &&
		offset !== undefined &&
		limit !== null &&
		limit !== undefined &&
		id !== null &&
		id !== undefined
	) {
		params.append('limit', limit);
		params.append('offset', offset);
		params.append('id', id);
	}

	const request = {
		params,
		paramsSerializer: (params) => {
			let result = '';

			for (const [key, value] of params) {
				result += `${key}=${encodeURIComponent(value)}&`;
			}

			return result.substr(0, result.length - 1);
		},
	};

	return request;
};

export const setParamsAuthorPublication = (offset, limit, status) => {
	const params = new URLSearchParams();

	if (
		offset !== null &&
		offset !== undefined &&
		limit !== null &&
		limit !== undefined &&
		status !== null &&
		status !== undefined
	) {
		params.append('limit', limit);
		params.append('offset', offset);
		params.append('status', status);
	}

	const request = {
		params,
		paramsSerializer: (params) => {
			let result = '';

			for (const [key, value] of params) {
				result += `${key}=${encodeURIComponent(value)}&`;
			}

			return result.substr(0, result.length - 1);
		},
	};

	return request;
};
