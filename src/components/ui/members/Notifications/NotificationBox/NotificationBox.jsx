import React from 'react';

import { useHistory } from 'react-router';

import NotificationBoxView from './NotificationBox.view';

const NotificationBox = (props) => {
	const history = useHistory();

	const handleClick = () => {
		history.push(`/article/${props.content.publication_id}`);
	};

	return <NotificationBoxView content={props.content} isRead={props.isRead} handleClick={handleClick} />;
};

NotificationBox.displayName = 'NotificationBox';
NotificationBox.defaultProps = {};

export default React.memo(NotificationBox);
