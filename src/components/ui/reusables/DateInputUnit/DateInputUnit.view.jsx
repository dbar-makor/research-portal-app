import React from 'react';
import { Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as IconCalendar } from '../../../../assets/icons/iconCalendar.svg';
import useStyles from './DateInputUnit.style';

const DateInputUnitView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<KeyboardDatePicker
					{...(props.error && { error: true, helpertext: props.error })}
					inputVariant={props.inputVariant}
					invalidDateMessage=""
					variant="inline"
					format="dd/MM/yyyy"
					style={{ width: '100%' }}
					value={props.value}
					autoOk
					placeholder={props.label}
					disableToolbar
					//className={props.datePickerClass}
					className={`${props.datePickerClass} ${classes.input}`}
					keyboardIcon={
						<IconCalendar
							style={{ width: props.iconFontSize }}
							className={classes.calendarIcon}
						/>
					}
					onChange={props.onChange}
				/>
			</Grid>
		</Grid>
	);
};

DateInputUnitView.displayName = 'DateInputUnitView';
DateInputUnitView.defaultProps = {};

export default React.memo(DateInputUnitView);
