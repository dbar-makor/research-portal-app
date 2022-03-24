import React from 'react';
import { useHistory } from 'react-router';
import AuthorsNewArticleModalView from './AuthorsNewArticleModal.view';

const AuthorsNewArticleModal = (props) => {
	const history = useHistory();

	return <AuthorsNewArticleModalView history={history} handleClose={props.handleClose} open={props.open} />;
};

AuthorsNewArticleModal.displayName = 'AuthorsNewArticleModal';
AuthorsNewArticleModal.defaultProps = {};

export default React.memo(AuthorsNewArticleModal);
