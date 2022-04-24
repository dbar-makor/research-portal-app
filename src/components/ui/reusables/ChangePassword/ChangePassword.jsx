import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { validateChangedPassword } from '../../../../utils/helpers/validationFunctions';
import { END_POINT, BASE_URL } from '../../../../utils/constants';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import ChangePasswordView from './ChangePassword.view';

const ChangePassword = (props) => {
	const initStateForm = {
		old_password: '',
		new_password: '',
		new_password_confirm: '',
	};

	const initStateRules = {
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
		other: false,
	};

	const [localForm, setLocalForm] = useState(initStateForm);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [passwordRules, setPasswordRules] = useState(initStateRules);
	const dispatch = useDispatch();

	const handleFormChange = useCallback((value, key, type) => {
		setLocalForm({ ...localForm, [key]: value });
		validateChangedPassword(
			{ [key]: value },
			errors,
			setErrors,
			setValidationResult,
			localForm.new_password,
			localForm.new_password_confirm,
		);
		const upperCase = /[A-Z]/;
		const lowerCase = /[a-z]/;
		const num = /[0-9]/;
		const other = /[\W]|[_]/;

		if (type === 'new') {
			if (value.length >= 8 && type === 'new') {
				setPasswordRules((prev) => ({ ...prev, length: true }));
			} else {
				setPasswordRules((prev) => ({ ...prev, length: false }));
			}

			if (upperCase.test(value) && type === 'new') {
				setPasswordRules((prev) => ({ ...prev, uppercase: true }));
			} else {
				setPasswordRules((prev) => ({ ...prev, uppercase: false }));
			}

			if (lowerCase.test(value) && type === 'new') {
				setPasswordRules((prev) => ({ ...prev, lowercase: true }));
			} else {
				setPasswordRules((prev) => ({ ...prev, lowercase: false }));
			}

			if (num.test(value) && type === 'new') {
				setPasswordRules((prev) => ({ ...prev, number: true }));
			} else {
				setPasswordRules((prev) => ({ ...prev, number: false }));
			}

			if (other.test(value) && type === 'new') {
				setPasswordRules((prev) => ({ ...prev, other: true }));
			} else {
				setPasswordRules((prev) => ({ ...prev, other: false }));
			}
		}
	});

	const handleReset = () => {
		props.handleCloseModal();
		setLocalForm(initStateForm);
		//setPasswordRules(initStateRules);
		setErrors({});
	};

	const handleFormSubmit = async () => {
		const result = validateChangedPassword(
			{ new_password: localForm.new_password },
			errors,
			setErrors,
			setValidationResult,
			localForm.new_password,
			localForm.new_password_confirm,
			'submit',
		);

		if (result) {
			try {
				const token = localStorage.getItem('token');

				const res = await axios.put(`${BASE_URL}${END_POINT.AUTH}/change-password`, localForm, {
					headers: { Authorization: token },
				});
				//history.push('/researches');

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Password changed successfully', 2000));
					handleReset();
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'Publish failed', 2000));
			}
		}
	};

	return (
		<ChangePasswordView
			chosenModal={props.chosenModal}
			localForm={localForm}
			errors={errors}
			passwordRules={passwordRules}
			validationResult={validationResult}
			handleFormChange={handleFormChange}
			handleFormSubmit={handleFormSubmit}
			handleReset={handleReset}
		/>
	);
};

ChangePassword.displayName = 'ChangePassword';
ChangePassword.defaultProps = {};

export default React.memo(ChangePassword);
