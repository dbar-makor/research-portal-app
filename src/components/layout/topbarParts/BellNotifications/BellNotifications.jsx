import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import * as webSocketService from '../../../../services/websocket';

import BellNotificationsView from './BellNotifications.view';

const BellNotifications = (props) => {
	let token = useSelector((state) => state.auth.token);

	token = token.substring(7);
	const notifyRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const newNotification = useSelector((state) => state.notifications.newNotification);

	const alertNotifications = useSelector((state) => state.notifications.alertNotifications);
	const id = props.openNotification ? 'simple-popper' : undefined;
	const [countAlerts, setCountAlerts] = useState(0);
	const history = useHistory();

	const redirect = (type) => {
		let message;

		switch (type) {
			case 'all-notfications':
				message = {
					type: 'get-all-notifications',
				};

				if (webSocketService.ws !== null) {
					webSocketService.sendEvent(message, token);
				} else {
					webSocketService.connectWS(token);
					webSocketService.sendEvent(message, token);
				}

				history.push('/all-notfications');
				props.setOpenNotification(false);
		}
	};

	return (
		<BellNotificationsView
			notifyRef={notifyRef}
			redirect={redirect}
			newNotification={newNotification}
			id={id}
			countAlerts={countAlerts}
			handleToggle={props.handleToggle}
			notifications={alertNotifications}
			handleListKeyDown={props.handleListKeyDown}
			handleClose={props.handleClose}
			openNotification={props.openNotification}
			setOpenNotification={props.setOpenNotification}
			setCountAlerts={setCountAlerts}
			open={props.open}
		/>
	);
};

BellNotifications.displayName = 'BellNotifications';
BellNotifications.defaultProps = {};

export default React.memo(BellNotifications);
