import React from 'react';

import MessageAlertView from './MessageAlert.view';

const MessageAlert = (props) => {
	return (
		<MessageAlertView
			open={props.open}
			handleClose={props.handleClose}
			title={props.title}
			text={props.text}
			actionName={props.actionName}
			handleAction={props.handleAction}
		/>
	);
};

MessageAlert.displayName = 'MessageAlert';
MessageAlert.defaultProps = {};

export default React.memo(MessageAlert);
