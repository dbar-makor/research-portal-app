import React, { forwardRef } from 'react';
import { IconButton, Input, InputAdornment, Popover } from '@material-ui/core';
import { ReactComponent as Calendar } from '../../../../assets/icons/iconCalendar.svg';
import { DateRangePicker } from 'react-date-range';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../../../styles/MainStyles';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const RangeDatePickerView = forwardRef((props, ref) => {
	const stylingProps = {
		clearable: props.from !== 'DD/MM/YYYY' && props.to !== 'DD/MM/YYYY' && props.from && props.to,
	};

	const classes = useStyles(stylingProps);

	return (
		<>
			<Input
				className={classes.dateRangeInputFilter}
				disabled={true}
				autoComplete="off"
				id="date-range"
				placeholder="dd/mm/yy - dd/mm/yy"
				value={
					props.from !== 'DD/MM/YYYY' && props.to !== 'DD/MM/YYYY' && props.from && props.to
						? `${props.from} - ${props.to}`
						: ''
				}
				// error={error}
				endAdornment={(
					<InputAdornment position="start" style={{ marginLeft: -5 }}>
						<ClearIcon onClick={(e) => props.clearInput(e)} />
						<IconButton id="calendarIcon" ref={ref}>
							<Calendar className={classes.calendar} />
						</IconButton>
					</InputAdornment>
   )}
				varient="outlined"
				onClick={(e) => {
					props.handleCalendarOpen(e);
				}}
			/>
			<Popover
				open={props.open}
				anchorEl={props.anchorEl && props.anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={() => props.setOpen(false)}
			>
				<DateRangePicker
					ranges={props.range}
					moveRangeOnFirstSelection={false}
					editableDateInputs={true}
					fixedHeight={true}
					months={1}
					direction="horizontal"
					preventSnapRefocus={true}
					calendarFocus="backwards"
					maxDate={new Date()}
					className={classes.dateRangePopover}
					staticRanges={[]}
					inputRanges={[]}
					rangeColors={['#1C67FF']}
					onChange={(item) => props.handleSelect(item)}
				/>
			</Popover>
		</>
	);
});

RangeDatePickerView.displayName = 'RangeDatePickerView';
RangeDatePickerView.defaultProps = {};

export default React.memo(RangeDatePickerView);
