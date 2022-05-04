import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as wsSocketService from '../../../services/websocket';
import TopBarView from './TopBar.view';

const TopBar = () => {
	let token = useSelector((state) => state.auth.token);

	token = token.substring(7);
	const searchTerm = useSelector((state) => state.search.searchTerm);
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [openNotification, setOpenNotification] = useState(false);
	const [openUserMgmt, setOpenUserMgmt] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const userType = useSelector((state) => state.auth.userContent?.type);

	// eslint-disable-next-line no-unused-vars

	// eslint-disable-next-line no-unused-vars
	const options = [
		{ value: 'allRegions', name: 'All Regions' },
		{ value: 'asiaPacific', name: 'Asia-Pacific' },
		{ value: 'europe', name: 'Europe' },
		{ value: 'unitedStates', name: 'United States' },
	];

	function handleListKeyDown(event, type) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);

			if (type === 'notify') {
				setOpenNotification(false);
			}
		} else if (event.key === 'Escape') {
			setOpen(false);

			if (type === 'notify') {
				setOpenNotification(false);
			}
		}
	}

	useEffect(() => {
		if (token) {
			const message = {
				type: 'get-notifications',
			};

			if (wsSocketService.ws !== null) {
				wsSocketService.sendEvent(message, token);
			} else {
				wsSocketService.connectWS(token);
				wsSocketService.sendEvent(message, token);
			}
		}
	}, [token]);

	const handleToggle = (type) => {
		if (type === 'user') {
			setOpen((prevOpen) => !prevOpen);
			setOpenUserMgmt(false);
		} else if (type === 'notify') {
			setOpenNotification(true);
			setOpen(false);
			setOpenUserMgmt(false);
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt((prevOpen) => !prevOpen);
			setOpen(false);
		}
	};

	const handleClose = (event, type) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		if (type === 'user') {
			setOpen(false);
		} else if (type === 'notify') {
			setOpenNotification(false);

			return;
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt(false);
		}
	};

	return (
		<TopBarView
			handleToggle={handleToggle}
			// handleClosePoppers={handleClosePoppers}
			// handleOpenPoppers={handleOpenPoppers}
			openUserMgmt={openUserMgmt}
			setOpenUserMgmt={setOpenUserMgmt}
			handleClose={handleClose}
			openNotification={openNotification}
			setOpenNotification={setOpenNotification}
			handleListKeyDown={handleListKeyDown}
			ref={anchorRef}
			userType={userType}
			setOpen={setOpen}
			open={open}
			isAuthenticated={isAuthenticated}
			options={options}
			searchterm={searchTerm}
		/>
	);
};

TopBar.displayName = 'TopBar';
TopBar.defaultProps = {};

export default React.memo(TopBar);
