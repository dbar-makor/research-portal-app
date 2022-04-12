import React from 'react';

import ExitPublicationAlertView from './ExitPublicationAlert.view';

const ExitPublicationAlert = (props) => {
	return (
		<ExitPublicationAlertView
			open={props.open}
			handleClose={props.handleClose}
			alertHandler={props.deleteItem}
			setNavigationAllowed={props.setNavigationAllowed}
		/>
	);
};

ExitPublicationAlert.displayName = 'ExitPublicationAlert';
ExitPublicationAlert.defaultProps = {};

export default React.memo(ExitPublicationAlert);
