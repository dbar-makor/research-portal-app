import React from 'react';
import { useHistory } from 'react-router';

import ExitPublicationAlertView from './ExitPublicationAlert.view';

const ExitPublicationAlert = (props) => {
	const history = useHistory();

	const handleDiscard = () => {
		props.alertDeleteHandler();
		props.setNavigationAllowed(true);
		props.handleClose();
		history.push(props.requestedLocation);
	};

	const handleSave = () => {
		props.setNavigationAllowed(true);
		props.handleClose();
		props.sendPublication('save-draft');
	};

	return (
		<ExitPublicationAlertView
			open={props.open}
			handleClose={props.handleClose}
			handleDiscard={handleDiscard}
			handleSave={handleSave}
		/>
	);
};

ExitPublicationAlert.displayName = 'ExitPublicationAlert';
ExitPublicationAlert.defaultProps = {};

export default React.memo(ExitPublicationAlert);
