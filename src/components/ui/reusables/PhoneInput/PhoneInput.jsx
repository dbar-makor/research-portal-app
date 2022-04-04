import React from 'react';
import { validateUserInformation } from '../../../../utils/helpers/validationFunctions';
import PhoneInputView from './PhoneInput.view';

const PhoneInput = (props) => {
	const handleSelect = (newValue) => {
		const tempAdornment = newValue ? newValue.code : '';

		validateUserInformation(
			{ dialing_code: newValue?.dialing_code },
			props.errors,
			props.setErrors,
			props.setValidationResult,
		);
		props.setUserInformation((prev) => ({
			...prev,
			phone: { ...prev.phone, dialing_code: newValue?.dialing_code },
		}));
		props.setAdornment(tempAdornment);
	};

	const handleSelectInput = (e, value, reason) => {
		if (e === null && reason === 'reset') {
			return;
		} else if (e.type === 'blur' && reason === 'reset') {
			return;
		}

		props.setDialingCodeInputValue(value);
	};

	return (
		<PhoneInputView
			dialingCodeInputValue={props.dialingCodeInputValue}
			setDialingCodeInputValue={props.setDialingCodeInputValue}
			handleSelect={handleSelect}
			handleSelectInput={handleSelectInput}
			handleUserInformationChange={props.handleUserInformationChange}
			userInformation={props.userInformation}
			adornment={props.adornment}
			setAdornment={props.setAdornment}
			errors={props.errors}
			setErrors={props.setErrors}
			validationResult={props.validationResult}
			setValidationResult={props.setValidationResult}
		/>
	);
};

PhoneInput.displayName = 'PhoneInput';
PhoneInput.defaultProps = {};

export default React.memo(PhoneInput);
