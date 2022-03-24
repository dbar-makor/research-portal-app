import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
	getUsersByTypeAsync,
	selectUsersLimit,
	selectUsersOffset,
	selectUsersStatus,
	selectUsersSearch,
} from '../../../../redux/users/usersSlice';
import { validateUser } from '../../../../utils/helpers/validationFunctions';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import NewUserModalView from './NewUserModal.view';

const NewUserModal = (props) => {
	const dispatch = useDispatch();
	const countriesArr = useSelector((state) => state.utils.utils.country);

	const [newUser, setNewUser] = useState({
		name: '',
		username: '',
		email: '',
		country: null,
	});

	const [inputValueCountry, setInputValueCountry] = useState('');
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	const clearAndClose = () => {
		setNewUser({
			name: '',
			username: '',
			email: '',
			country: null,
		});
		setInputValueCountry('');
		props.handleClose();
	};

	const updateUserField = (value, key) => {
		const userCopy = { ...newUser, [key]: value };

		setNewUser(userCopy);
		validateUser({ [key]: value }, errors, setErrors, setValidationResult);
	};

	const sendNewUser = async () => {
		const userToSend = { ...newUser, country: newUser.country.code, type: props.userType };

		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.USER}`, userToSend);

			if (res.status === 201) {
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully added', 2000));
				dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, props.userType, userStatus));
				clearAndClose();
			}
		} catch (error) {
			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This user already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Failed adding user', 2000));
			}

			props.handleClose();
		}
	};

	return (
		<NewUserModalView
			open={props.open}
			clearAndClose={clearAndClose}
			userType={props.userType}
			newUser={newUser}
			updateUserField={updateUserField}
			errors={errors}
			countriesArr={countriesArr}
			inputValueCountry={inputValueCountry}
			setInputValueCountry={setInputValueCountry}
			validationResult={validationResult}
			sendNewUser={sendNewUser}
		/>
	);
};

NewUserModal.displayName = 'NewUserModal';
NewUserModal.defaultProps = {};

export default React.memo(NewUserModal);
