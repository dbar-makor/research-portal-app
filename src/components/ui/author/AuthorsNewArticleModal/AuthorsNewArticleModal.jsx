import React from 'react';
import { useHistory } from 'react-router';
import AuthorsNewArticleModalView from './AuthorsNewArticleModal.view';

const AuthorsNewArticleModal = (props) => {
	const history = useHistory();

	const removeArticleId = () => sessionStorage.removeItem('articleId');
	const removeDeadArticleId = () => sessionStorage.removeItem('deadArticleId');

	return (
		<AuthorsNewArticleModalView
			removeArticleId={removeArticleId}
			removeDeadArticleId={removeDeadArticleId}
			history={history}
			handleClose={props.handleClose}
			open={props.open}
		/>
	);
};

AuthorsNewArticleModal.displayName = 'AuthorsNewArticleModal';
AuthorsNewArticleModal.defaultProps = {};

export default React.memo(AuthorsNewArticleModal);
