import React, { forwardRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tradingHoursData from '../dummy.json';

import TradingHoursView from './TradingHours.view';

const TradingHours = forwardRef((props, ref) => {
	const {
		handleToggle,
		notifications,
		openNotification,
		setOpenNotification,
		handleListKeyDown,
		handleClose,
		userType,
		setOpen,
		open,
	} = props;

	const [isLogin, setIsLogin] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const data = tradingHoursData.data;

	const history = useHistory();

	const handleLogin = () => {
		setIsLogin(true);
	};

	const formattedData = Object.entries(data).map(([key, value]) => {
		return { country: key, status: value.status, time: value.local_time.substring(11, 16) };
	});

	useEffect(() => {
		const unlisten = history.listen((location) => {
			console.log('call me out');

			if (location.pathname === '/login') {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		});

		return unlisten;
	}, []);

	return (
		<TradingHoursView
			handleToggle={handleToggle}
			notifications={notifications}
			openNotification={openNotification}
			setOpenNotification={setOpenNotification}
			handleListKeyDown={handleListKeyDown}
			handleClose={handleClose}
			ref={ref}
			userType={userType}
			setOpen={setOpen}
			open={open}
			data={data}
			formattedData={formattedData}
			isAuthenticated={isAuthenticated}
			isLogin={isLogin}
			handleLogin={handleLogin}
		/>
	);
});

TradingHours.displayName = 'TradingHours';
TradingHours.defaultProps = {};

export default React.memo(TradingHours);
