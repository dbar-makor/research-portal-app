import React, { useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import RangeDatePickerView from './RangeDatePicker.view';

const RangeDatePicker = (props) => {
	const calendarIconRef = useRef();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const [counter, setCounter] = useState(0);

	const handleSelect = useCallback((item) => {
		setCounter(counter + 1);
		const testStartDate = moment(moment(item.selection.startDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');
		const testEndDate = moment(moment(item.selection.endDate).format('DD/MM/YYYY'), 'DD/MM/YYYY');

		const differenceInDays = moment.duration(testEndDate.diff(testStartDate)).asDays();

		if (differenceInDays <= props.max_days_allowed) {
			setRange([item.selection]);
			props.setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
			props.setTo(moment(item.selection.endDate).format('DD/MM/YYYY'));
		} else {
			const modifiedEndDate = moment(
				moment(item.selection.startDate).format('DD/MM/YYYY'),
				'DD/MM/YYYY',
			).add(props.max_days_allowed, 'days');

			setRange([{ ...item.selection, endDate: modifiedEndDate._d }]);
			props.setFrom(moment(item.selection.startDate).format('DD/MM/YYYY'));
			props.setTo(moment(modifiedEndDate).format('DD/MM/YYYY'));
		}

		if (counter === 1) {
			setOpen(false);
			setCounter(0);
		}
	});

	const handleCalendarOpen = useCallback(() => {
		setAnchorEl(calendarIconRef.current);
		calendarIconRef.current && DateRangePicker && setOpen(true);
	});

	const clearInput = useCallback((e) => {
		e.stopPropagation();
		setRange([
			{
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			},
		]);
		props.setFrom('DD/MM/YYYY');
		props.setTo('DD/MM/YYYY');
	});

	return (
		<RangeDatePickerView
			from={props.from}
			to={props.to}
			handleCalendarOpen={handleCalendarOpen}
			handleSelect={handleSelect}
			clearInput={clearInput}
			anchorEl={anchorEl}
			setOpen={setOpen}
			open={open}
			range={range}
			ref={calendarIconRef}
		/>
	);
};

RangeDatePicker.displayName = 'RangeDatePicker';
RangeDatePicker.defaultProps = {};

export default React.memo(RangeDatePicker);
