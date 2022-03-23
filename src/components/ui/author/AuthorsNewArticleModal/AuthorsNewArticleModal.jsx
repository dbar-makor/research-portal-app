import React from 'react';
import AuthorsNewArticleModalView from './AuthorsNewArticleModal.view';
import { useHistory } from 'react-router';

const AuthorsNewArticleModal = (props) => {
	const history = useHistory();

	return <AuthorsNewArticleModalView history={history} handleClose={props.handleClose} open={props.open} />;
};

AuthorsNewArticleModal.displayName = 'AuthorsNewArticleModal';
AuthorsNewArticleModal.defaultProps = {};

export default React.memo(AuthorsNewArticleModal);
