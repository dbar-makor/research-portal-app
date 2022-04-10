import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, InputAdornment, Grid } from '@material-ui/core';
import NumberInputUnit from '../NumberInputUnit/NumberInputUnit';
import NumberFormatCustom from '../../../layout/NumberFormatCustom/NumberFormatCustom';
import useStyles, { StyledAutoComplete, CustomTextField, PopperMy } from './PhoneInput.style';

const PhoneInputView = (props) => {
	const countries = useSelector((state) => state.utils.utils.country);
	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={5}>
				<StyledAutoComplete
					id="dialing_code"
					PopperComponent={PopperMy}
					options={countries && countries.length ? countries : []}
					autoComplete="off"
					disableClearable
					value={props.userInformation?.country}
					inputValue={props.dialingCodeInputValue}
					getOptionLabel={(option) => {
						return option.dialing_code ? option.dialing_code.toString() : '';
					}}
					renderOption={(option, props) => {
						return (
							<Box component="li" className={classes.flagBox} {...props}>
								<img
									className={classes.flagImg}
									loading="eager"
									src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
									alt=""
								/>
								<Typography variant="span" component="span" style={{ marginLeft: '8px' }}>
									{option.name}
{' '}
+
{option.dialing_code}
								</Typography>
							</Box>
						);
					}}
					renderInput={(params) => {
						return (
							<CustomTextField
								className={classes.dialingCodeField}
								label="Phone"
								variant="outlined"
								autoComplete="off"
								error={!!props.errors.dialing_code}
								helperText={props.errors.dialing_code}
								{...params}
								InputProps={{
									...params.InputProps,
									autoComplete: 'dialing_code',
									startAdornment: (
										<InputAdornment position="start" style={{ position: 'relative' }}>
											<Box component="span" {...props}>
												{props.adornment && (
													<img
														className={`${classes.flagImg} ${classes.inputFlag}`}
														loading="eager"
														src={`https://flagcdn.com/w20/${props.adornment?.toLowerCase()}.png`}
														srcSet={`https://flagcdn.com/w40/${props.adornment?.toLowerCase()}.png 2x`}
														alt=""
													/>
												)}
											</Box>
										</InputAdornment>
									),
								}}
							/>
						);
					}}
					onChange={(event, value) => props.handleSelect(value, 'dialing_code')}
					onInputChange={(event, value, reason) => props.handleSelectInput(event, value, reason)}
				/>
			</Grid>
			<Grid item xs={7}>
				<NumberInputUnit
					className={classes.phoneInput}
					variant="outlined"
					size="small"
					id="phone"
					value={props.userInformation?.phone?.number || ''}
					InputProps={{
						inputComponent: NumberFormatCustom,
						inputProps: {
							decimalNo: 0,
							minValue: 0,
							thousandSeparator: false,
						},
					}}
					fontSize="14px"
					error={!!props.errors.number}
					helperText={props.errors.number}
					onChange={(e) => props.handleUserInformationChange('number', e.target.value, e.reason)}
				/>
			</Grid>
		</Grid>
	);
};

PhoneInputView.displayName = 'PhoneInputView';
PhoneInputView.defaultProps = {};

export default React.memo(PhoneInputView);
