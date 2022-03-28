import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInputView from './PhoneInput.view';

const PhoneInput = () => {
	const dispatch = useDispatch();
	const [countryInput, setCountryInput] = useState('');
	const [countryInputValue, setCountryInputValue] = useState('');
	const [countryCodeInput, setCountryCodeInput] = useState('');
	const [countryCodeInputValue, setCountryCodeInputValue] = useState('');
	const [phoneInput, setPhoneInput] = useState('');
	const [adornment, setAdornment] = useState(null);

	const handleSelect = (newValue) => {
		console.log('newValue', newValue.code);
		const value = newValue ? Number(newValue.dialing_code) : '';
		const tempAdornment = newValue ? newValue.code : '';
		setCountryCodeInput(value);
		setAdornment(tempAdornment);
	};

	const handleSelectInput = (e, value, reason) => {
		if (e === null && reason === 'reset') {
			return;
		} else if (e.type === 'blur' && reason === 'reset') {
			return;
		}
		setCountryCodeInputValue(value);
	};

	const handlePhoneInput = (value) => {
		const numberValidation = /^\d*\.?\d*$/.test(value);
		if (numberValidation) {
			setPhoneInput(value);
		}
	};

	return (
		<PhoneInputView
			countryInput={countryInput}
			countryInputValue={countryInputValue}
			countryCodeInput={countryCodeInput}
			countryCodeInputValue={countryCodeInputValue}
			handleSelect={handleSelect}
			handleSelectInput={handleSelectInput}
			handlePhoneInput={handlePhoneInput}
			phoneInput={phoneInput}
			adornment={adornment}
		/>
	);
};

PhoneInput.displayName = 'PhoneInput';
PhoneInput.defaultProps = {};

export default React.memo(PhoneInput);
