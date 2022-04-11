import React, { forwardRef } from 'react';
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

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const data = tradingHoursData.data;

	const formattedData = Object.entries(data).map(([key, value]) => {
		return { country: key, status: value.status, time: value.local_time.substring(11, 16) };
	});

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
		/>
	);
});

TradingHours.displayName = 'TradingHours';
TradingHours.defaultProps = {};

export default React.memo(TradingHours);
