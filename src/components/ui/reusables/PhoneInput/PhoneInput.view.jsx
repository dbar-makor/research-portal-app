import React from 'react';
import { useSelector } from 'react-redux';
import { StyledAutoComplete, CustomTextField, PopperMy } from './PhoneInput.style';
import { Box, Typography, InputAdornment, Grid } from '@material-ui/core';

const PhoneInputView = (props) => {
	const countries = useSelector((state) => state.utils.utils.country);
  //let countries= [{dialing_code:'972',code:'il'},{dialing_code:'972',code:'il'}]
	console.log('props', props);
	console.log('utils', countries && countries.length && countries[0]);
	// console.log('utils', countries.length);
	return (
		<Grid container>
			<Grid item xs={5}>
				<StyledAutoComplete
					defaultValue={props.countryCodeInputValue}
					id="dialing_code"
					PopperComponent={PopperMy}
					options={ countries && countries.length?countries:[{dialing_code:'972',code:'il'},{dialing_code:'972',code:'il'}]}
					autoComplete="off"
					value={props.countryCodeInput}
					inputValue={props.countryCodeInputValue}
					getOptionLabel={(option) => {
            console.log('option',option);
            return (option.dialing_code ? option.dialing_code.toString() : '')
          } 
        }//
					onChange={(event, value) => props.handleSelect(value, 'dialing_code')}
					onInputChange={(event, value, reason) =>
						props.handleSelectInput(event, value, reason, 'dialing_code')
					}
					renderOption={(option, props) => {
						return (
							<Box component="li" style={{ border :'1px solid #ED3FF3', height: '40px', width: '140px','& img': { height: '100%', width: '100%' ,border :'1px solid #ED3FF3'} }} {...props}>
								<img
									loading="eager"
									width="16"
									src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
									alt=""
								/>
								<Typography variant="span" component="span" style={{ marginLeft: '8px' }}>
									+{option.dialing_code} 
								</Typography>
							</Box>
						);
					}}
					renderInput={(params) => {
						return (
							<CustomTextField
								placeholder="Code *"
								autoComplete="off"
								required
								{...params}
								InputProps={{
									...params.InputProps,
									autoComplete: 'dialing_code',
									startAdornment: (
										<InputAdornment position="start">
											<Box
												component="span"
												style={{ '& > img': { height: '50px' } }}
												{...props}
											>
												<img
													loading="eager"
													width="16"
													src={`https://flagcdn.com/w20/${props.adorment?.toLowerCase()}.png`}
													srcSet={`https://flagcdn.com/w40/${props.adorment?.toLowerCase()}.png 2x`}
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
			<Grid item xs={6}>
				<CustomTextField
					size="small"
					id="phone"
					value={props.phoneInput}
					placeholder="Phone"
					label="Phone"
					required
					onChange={(e) => props.handlePhoneInput(e.target.value)}
					inputProps={{
						autoComplete: 'off',
					}}
					fontSize={'14px'}
					//className={classes.numbersFont}
				/>
			</Grid>
		</Grid>
	);
};

PhoneInputView.displayName = 'PhoneInputView';
PhoneInputView.defaultProps = {};

export default React.memo(PhoneInputView);
