import React from 'react';
import { Grid } from '@material-ui/core';
import { StyledTextField } from '../../../../styles/ContarctsModalStyles';

const NumberInputUnitView = (props) => {
	return (
		<Grid container className={props.className}>
			<Grid item xs={12}>
				<StyledTextField
					name={props.name}
					value={props.value}
					style={{ width: '100%' }}
					fullWidth
					variant="outlined"
					placeholder={props.label}
					InputProps={props.InputProps}
					{...(props.error && { error: true, helpertext: props.error })}
					onChange={props.onChange}
				/>
			</Grid>
		</Grid>
	);
};

NumberInputUnitView.displayName = 'NumberInputUnitView';
NumberInputUnitView.defaultProps = {};

export default React.memo(NumberInputUnitView);
