import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AdminTopbarView from './AdminTopbar.view';

const AdminTopbar = (props) => {
	const userMgmtRef = useRef(null);
	const history = useHistory();

	const adminGoTo = (pathName) => {
		props.setOpenUserMgmt(false);
		history.push(pathName);
	};

	return (
		<AdminTopbarView
			userMgmtRef={userMgmtRef}
			handleToggle={props.handleToggle}
			openUserMgmt={props.openUserMgmt}
			setOpenUserMgmt={props.setOpenUserMgmt}
			userType={props.userType}
			handleClose={props.handleClose}
			adminGoTo={adminGoTo}
		/>
	);
};

AdminTopbar.displayName = 'AdminTopbar';
AdminTopbar.defaultProps = {};

export default React.memo(AdminTopbar);
