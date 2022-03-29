import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './SelectFormControl.style';

const iconComponent = (props) => {
	return <ExpandMoreIcon className={props.className} />;
};

const SelectFormControlView = (props) => {
	const classes = useStyles(props);

  const menuProps = {
    //controlling popper position
		anchorOrigin: {
			vertical: 'bottom',
			horizontal: 'left',
		},
		transformOrigin: {
			vertical: 'top',
			horizontal: 'left',
		},
		getContentAnchorEl: null,
	};

	return (
		<FormControl className={classes.root}>
			<Select
				disableUnderline
				className={classes.select}
				value={props.value || ''}
				placeholder={props.placeholder || ''}
				MenuProps={menuProps}
				IconComponent={props.iconComponent ? props.iconComponent : iconComponent}
				onChange={props.onChange}
			>
				{props.optionsArray?.map((option) => (
					<MenuItem key={option[props.valueField]} value={option[props.valueField]}>
						{option[props.labelField]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

SelectFormControlView.displayName = 'SelectFormControlView';
SelectFormControlView.defaultProps = {};

export default React.memo(SelectFormControlView);
