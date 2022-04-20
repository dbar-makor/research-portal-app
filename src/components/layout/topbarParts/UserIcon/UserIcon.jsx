import React, { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionAuth from '../../../../redux/auth/action';
import { changeSettingsTab } from '../../../../redux/tabs/tabsSlice';
import UserIconView from './UserIcon.view';

const UserIcon = forwardRef((props, ref) => {
	const history = useHistory();
	const { handleToggle, userType, handleClose, setOpen, open } = props;
	const user = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(actionAuth.logout());
		history.push('/home');
	};

	const handleChange = (tab) => {
		dispatch(changeSettingsTab(tab));
	};

	return (
		<UserIconView
			handleToggle={handleToggle}
			// handleClosePoppers={props.handleClosePoppers}
			// handleOpenPoppers={props.handleOpenPoppers}
			userType={userType}
			handleClose={handleClose}
			setOpen={setOpen}
			open={open}
			user={user}
			handleLogout={handleLogout}
			handleChange={handleChange}
			ref={ref}
		/>
	);
});

UserIcon.displayName = 'UserIcon';
UserIcon.defaultProps = {};

export default React.memo(UserIcon);
