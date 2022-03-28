import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, InputAdornment, Grid } from '@material-ui/core';
import useStyles, { StyledAutoComplete, CustomTextField, PopperMy } from './PhoneInput.style';

const PhoneInputView = (props) => {
	const countries = useSelector((state) => state.utils.utils.country);
	const classes = useStyles();
	return (
		<Grid container>
			<Grid item xs={5}>
				<StyledAutoComplete
					defaultValue={props.countryCodeInputValue}
					id="dialing_code"
					PopperComponent={PopperMy}
					options={countries && countries.length ? countries : []}
					autoComplete="off"
					value={props.countryCodeInput}
					onChange={(event, value) => props.handleSelect(value, 'dialing_code')}
					inputValue={props.countryCodeInputValue}
					getOptionLabel={(option) => {
						return option.dialing_code ? option.dialing_code.toString() : '';
					}}
					onInputChange={(event, value, reason) =>
						props.handleSelectInput(event, value, reason, 'dialing_code')
					}
					renderOption={(option, props) => {
						return (
							<Box component="li" {...props}>
								<img
									className={classes.flagImg}
									loading="eager"
									src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
									alt=""
								/>
								<Typography variant="span" component="span" style={{ marginLeft: '8px' }}>
									{option.name} +{option.dialing_code}
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
								//required
								{...params}
								InputProps={{
									...params.InputProps,
									autoComplete: 'dialing_code',
									startAdornment: (
										<InputAdornment position="start" style={{ position: 'relative' }}>
											<Box component="span" {...props}>
												<img
													className={`${classes.flagImg} ${classes.inputFlag}`}
													loading="eager"
													src={`https://flagcdn.com/w20/${props.adornment?.toLowerCase()}.png`}
													srcSet={`https://flagcdn.com/w40/${props.adornment?.toLowerCase()}.png 2x`}
													alt=""
												/>
											</Box>
										</InputAdornment>
									),
								}}
							/>
						);
					}}
				/>
			</Grid>
			<Grid item xs={6} >
				<CustomTextField
					variant="outlined"
					size="small"
					id="phone"
					value={props.phoneInput}
					onChange={(e) => props.handlePhoneInput(e.target.value)}
					inputProps={{
						autoComplete: 'off',
					}}
					fontSize={'14px'}
				/>
			</Grid>
		</Grid>
	);
};

PhoneInputView.displayName = 'PhoneInputView';
PhoneInputView.defaultProps = {};

export default React.memo(PhoneInputView);
