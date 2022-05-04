import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import BellNotificationsView from './BellNotifications.view';

const BellNotifications = (props) => {
	const notifyRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [newNotification, setNewNotification] = useState(false);

	const alertNotifications = useSelector((state) => state.notifications.alertNotifications);
	const id = props.openNotification ? 'simple-popper' : undefined;
	const [countAlerts, setCountAlerts] = useState(0);
	const history = useHistory();

	const redirect = (type) => {
		switch (type) {
			case 'all-notfications':
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
