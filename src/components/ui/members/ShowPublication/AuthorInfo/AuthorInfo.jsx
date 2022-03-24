import React, { useState } from 'react';

import AuthorInfoView from './AuthorInfo.view';

const AuthorInfo = (props) => {
	const [author] = useState({
		name: 'Eliyahu Hillel',
		avatar: 'https://image.pngaaa.com/419/263419-middle.png',
	});

	return <AuthorInfoView lastDate={props.lastDate} author={author} />;
};

AuthorInfo.displayName = 'AuthorInfo';
AuthorInfo.defaultProps = {};

export default React.memo(AuthorInfo);
