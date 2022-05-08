import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as webSocketService from '../../../../../services/websocket';

import AllNotificationsView from './AllNotifications.view';

const AllNotifications = () => {
	let token = useSelector((state) => state.auth.token);

	token = token.substring(7);
	const notifications = useSelector((state) => state.notifications.notifications);
	const [filteredNotifications, setFilteredNotifications] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [markAsRead, setMarkAsRead] = useState(0);

	useEffect(() => {
		const message = {
			type: 'get-all-notifications',
		};

		if (webSocketService.ws !== null) {
			webSocketService.sendEvent(message, token);
		} else {
			webSocketService.connectWS(token);
			webSocketService.sendEvent(message, token);
		}
	}, [markAsRead]);

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredNotifications(notifications);
		} else {
			const filteredResults = notifications.filter((notification) => {
				const title = JSON.parse(notification.content).title?.toLowerCase();

				return title?.includes(searchTerm?.toLowerCase());
			});

			setFilteredNotifications(filteredResults);
		}
	}, [searchTerm, notifications]);

	const makeAllRead = () => {
		const data = {
			type: 'mark-all-read',
		};

		webSocketService.sendEvent(data, token);
		setMarkAsRead((prev) => prev + 1);
	};

	return (
		<AllNotificationsView
			notifications={notifications}
			filteredNotifications={filteredNotifications}
			setSearchTerm={setSearchTerm}
			makeAllRead={makeAllRead}
		/>
	);
};

AllNotifications.displayName = 'AllNotifications';
AllNotifications.defaultProps = {};

export default React.memo(AllNotifications);
