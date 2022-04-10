import React from 'react';
import { Grid } from '@material-ui/core';
import { StyledTextField } from '../../../../styles/MainStyles';
import useStyles from './TextInputUnit.style';

const TextInputUnitView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={props.className}>
			<Grid item xs={props.size}>
				<StyledTextField
					className={classes.field}
					name={props.name}
					value={props.value}
					inputProps={{ autoComplete: 'off', readOnly: props.readOnly ? true : false }}
					placeholder={props.label}
					style={{ width: '100%' }}
					variant="outlined"
					onChange={props.onChange}
					{...(props.error && { error: true, helpertext: props.error })}
					{...(props.id && { id: props.id })}
					{...(props.type && { type: props.type })}
					{...(props.InputProps && { InputProps: props.InputProps })}
					{...(props.inputProps && { inputProps: props.inputProps })}
					{...(props.onKeyDown && { onKeyDown: props.onKeyDown })}
					{...(props.type && { type: props.type })}
				/>
			</Grid>
		</Grid>
	);
};

TextInputUnitView.displayName = 'TextInputUnitView';
TextInputUnitView.defaultProps = {};

export default React.memo(TextInputUnitView);
