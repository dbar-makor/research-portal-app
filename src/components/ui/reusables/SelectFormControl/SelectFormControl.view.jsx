import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ReactComponent as PolygonDown } from '../../../../assets/icons/PolygonDown.svg';
import useStyles from './SelectFormControl.style';

const iconComponent = (props) => {
	return <PolygonDown className={props.className} />;
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
		PaperProps: {
			style: {
				borderRadius: '8px',
				boxShadow: '1px 2px 2px  #0018581F',
				transform: 'translate(0, 8px)',
			},
		},
	};

	return (
		<FormControl className={classes.root}>
			<InputLabel>{props.placeholder}</InputLabel>
			<Select
				disableUnderline
				className={classes.select}
				value={props.value || ''}
				placeholder={props.placeholder}
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
