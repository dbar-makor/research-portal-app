import React from 'react';

import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import * as webSocketService from '../../../../../services/websocket';

import NotificationBoxView from './NotificationBox.view';

const NotificationBox = (props) => {
	let token = useSelector((state) => state.auth.token);

	token = token.substring(7);
	const history = useHistory();

	const handleClick = () => {
		const articleId = props?.content?.publication_id;

		localStorage.setItem('articleId', JSON.stringify(articleId));
		const message = {
			type: 'set-is-read',
			id: articleId,
		};

		if (webSocketService.ws !== null) {
			webSocketService.sendEvent(message, token);
		} else {
			webSocketService.connectWS(token);
			webSocketService.sendEvent(message, token);
		}

		history.push(`/article/${articleId}`);
	};

	return <NotificationBoxView content={props.content} isRead={props.isRead} handleClick={handleClick} />;
};

NotificationBox.displayName = 'NotificationBox';
NotificationBox.defaultProps = {};

export default React.memo(NotificationBox);
