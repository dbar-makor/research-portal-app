import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import * as utilsAction from '../../../../redux/utils/utilsSlice';
import { validateUserInformation } from '../../../../utils/helpers/validationFunctions';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import EditProfileView from './EditProfile.view';

const EditProfile = () => {
	const userContent = useSelector((state) => state.auth.userContent);

	const [avatar, setAvatar] = useState(
		'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	);

	const dispatch = useDispatch();
	const [userInformation, setUserInformation] = useState({});
	const [dialingCodeInputValue, setDialingCodeInputValue] = useState('');
	const [adornment, setAdornment] = useState(null);
	const [localCats, setLocalCats] = useState([]);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(true);
	const [chosenModal, setChosenModal] = useState(false);

	const handleCloseModal = useCallback(() => {
		setChosenModal(false);
	});

	const handleOpenModal = useCallback(() => {
		setChosenModal(true);
	});

	const fetchUserInformation = useCallback(async () => {
		try {
			const token = localStorage.getItem('token');

			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/${userContent.id}`);

			if (res.status === 201 || res.status === 200) {
				const userData = res.data;

				userData.phone = JSON.parse(userData.phone);
				//userData.country = { ...userData.country, dialing_code: userData.phone.dialing_code };
				userData.birthday = '01/01/2000';
				userData.categories = [
					{
						id: '4c9b048d-4c27-11ec-8f4c-10e7c6179426',
						name: 'Investment strategy',
					},
					{
						id: '92dc90ce-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Long/short event driven',
					},
					{
						id: '92dcb04d-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Midday Geneva',
					},
					{
						id: '92dcbe11-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Morning news & top trading ideas',
					},
					{
						id: '92dcc5a9-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Risk arbitrage',
					},
					{
						id: '92dccd03-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Special situation',
					},
					{
						id: '92dce4b6-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Technical analysis',
					},
					{
						id: '92dcebad-4dd7-11ec-8f4c-10e7c6179426',
						name: 'Weekly macroscopy',
					},
				];
				setLocalCats(userData.categories);
				setUserInformation(userData);
				setDialingCodeInputValue(userData.phone.dialing_code);
				setAdornment(userData.country.code);
			}
		} catch (error) {}
	});

	const handleFormSubmit = async () => {
		const tempCategories = userInformation.categories.map((c) => c.id);
		const tempUserInformation = { ...userInformation };

		tempUserInformation.categories = tempCategories;
		delete tempUserInformation.country;
		delete tempUserInformation.type;
		delete tempUserInformation.last_publication;
		delete tempUserInformation.most_read;
		delete tempUserInformation.created_at;
		delete tempUserInformation.last_connected_at;
		delete tempUserInformation.total_views;
		delete tempUserInformation.total_published;
		delete tempUserInformation.id;
		//userInformation.categories = tempCategories;

		try {
			const res = await axios.put(
				`${BASE_URL}${END_POINT.USER}/${userContent.id}`,
				tempUserInformation,
			);

			if (res.status === 200) {
				fetchUserInformation();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
			}
		} catch (error) {
			/* eslint no-console: "off" */
			console.log(error);

			if (error.response.status === 402) {
				dispatch(actionSnackBar.setSnackBar('error', 'This user already exists', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Update failed', 2000));
			}
		}
	};

	const handleCatsChange = (values) => {
		setLocalCats(values);
		validateUserInformation({ categories: values }, errors, setErrors, setValidationResult);
	};

	const handleUserInformationChange = (key, value, reason) => {
		validateUserInformation({ [key]: value }, errors, setErrors, setValidationResult);

		if (key === 'number' && reason === 'event') {
			setUserInformation((prev) => ({ ...prev, phone: { ...prev.phone, number: value } }));

			return;
		}

		// Phone number calls this function twice, so the condtion avoids creating another property when reason is undefined
		if (key !== 'number') setUserInformation((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {
		dispatch(utilsAction.getUtilsAsync());
		fetchUserInformation();

		return () => {
			setUserInformation({});
		};
	}, []);

	return (
		<>
			{userInformation ? (
				<EditProfileView
					avatar={avatar}
					setAvatar={setAvatar}
					userInformation={userInformation}
					setUserInformation={setUserInformation}
					chosenModal={chosenModal}
					setChosenModal={setChosenModal}
					handleCloseModal={handleCloseModal}
					handleOpenModal={handleOpenModal}
					errors={errors}
					setErrors={setErrors}
					validationResult={validationResult}
					setValidationResult={setValidationResult}
					handleCatsChange={handleCatsChange}
					handleUserInformationChange={handleUserInformationChange}
					localCats={localCats}
					setLocalCats={setLocalCats}
					dialingCodeInputValue={dialingCodeInputValue}
					setDialingCodeInputValue={setDialingCodeInputValue}
					adornment={adornment}
					setAdornment={setAdornment}
					handleFormSubmit={handleFormSubmit}
				/>
			) : null}
		</>
	);
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
