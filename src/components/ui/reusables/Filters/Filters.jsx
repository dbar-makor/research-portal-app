import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FiltersView from './Filters.view';

const Filters = (props) => {
	const dispatch = useDispatch();
	const [localSearch, setLocalSearch] = useState('');

	const userType =
		props.pageType === 'salesUsers' ? 'sales' : props.pageType === 'authorsUsers' ? 'author' : '';

	useEffect(() => {
		return () => {
			dispatch(props.setProperty({ key: 'search', value: '' }));
			dispatch(props.setProperty({ key: 'status', value: '' }));
		};
	}, []);

	// eslint-disable-next-line no-unused-vars
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<FiltersView
			handleOpen={handleOpen}
			handleClose={handleClose}
			localSearch={localSearch}
			setLocalSearch={setLocalSearch}
			setProperty={props.setProperty}
			pageType={props.pageType}
			type={props.type}
			userType={userType}
			status={props.status}
			open={open}
		/>
	);
};

Filters.displayName = 'Filters';
Filters.defaultProps = {};

export default React.memo(Filters);
