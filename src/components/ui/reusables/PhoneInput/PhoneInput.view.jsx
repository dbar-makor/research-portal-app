import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, InputAdornment, Grid } from '@material-ui/core';
import NumberInputUnit from '../NumberInputUnit/NumberInputUnit';
import NumberFormatCustom from '../../../layout/NumberFormatCustom/NumberFormatCustom';
import useStyles, { StyledAutoComplete, CustomTextField } from './PhoneInput.style';

const PhoneInputView = (props) => {
	const countries = useSelector((state) => state.utils.utils.country);
	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={3} lg={4}>
				<StyledAutoComplete
					id="dialing_code"
					className={classes.phoneField}
					// PopperComponent={PopperMy}
					options={countries && countries.length ? countries : []}
					//autoComplete="off"
					disableClearable
					value={props.userInformation?.country || { name: '', code: '', dialing_code: '' }}
					inputValue={props.dialingCodeInputValue}
					getOptionLabel={(option) => {
						return option.dialing_code ? option.dialing_code.toString() : '';
					}}
					renderOption={(option, props) => {
						return (
							<Box
								//component="li"
								className={classes.flagBox}
								selected={props.selected}
								value={props.inputValue}
							>
								<img
									className={classes.flagImg}
									loading="eager"
									src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
									alt=""
								/>
								<Typography variant="caption" component="span" style={{ marginLeft: '8px' }}>
									{option.name}
									&nbsp;
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
										<InputAdornment position="start">
											{/* <Box component="span" {...props}> */}
											<Box component="span">
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
			<Grid item xs={9} lg={8}>
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
