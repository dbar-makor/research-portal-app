import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../utils/constants';
import * as utilsAction from '../../../../redux/utils/utilsSlice';
import EditProfileView from './EditProfile.view';

const EditProfile = () => {
	const userContent = useSelector((state) => state.auth.userContent);

	const [avatar, setAvatar] = useState(
		'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	);

	const dispatch = useDispatch();
	const [fullName, setFullName] = useState('');
	const [userInformation, setUserInformation] = useState({});
	const [localCats, setLocalCats] = useState([]);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [chosenModal, setChosenModal] = useState(false);

	const handleCloseModal = useCallback(() => {
		setChosenModal(false);
	});

	const handleOpenModal = useCallback(() => {
		setChosenModal(true);
	});

	const fetchUserInformation = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/${userContent.id}`);

			if (res.status === 201 || res.status === 200) {
				const userInformation = res.data;

				userInformation.phone = JSON.parse(userInformation.phone);
				userInformation.birthday = '01/01/2000';
				userInformation.categories = [
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
				console.log('userInformation', userInformation);
				setLocalCats(userInformation.categories);
				setUserInformation(userInformation);
			}
		} catch (error) {}
	});

	const handleCatsChange = (values) => {
		setLocalCats(values);
	};

	useEffect(() => {
		dispatch(utilsAction.getUtilsAsync());
		fetchUserInformation();

		return () => {
			setUserInformation({});
		};
	}, []);

	return (
		<EditProfileView
			avatar={avatar}
			setAvatar={setAvatar}
			fullName={fullName}
			setFullName={setFullName}
			userInformation={userInformation}
			chosenModal={chosenModal}
			setChosenModal={setChosenModal}
			handleCloseModal={handleCloseModal}
			handleOpenModal={handleOpenModal}
			errors={errors}
			setErrors={setErrors}
			validationResult={validationResult}
			setValidationResult={setValidationResult}
			handleCatsChange={handleCatsChange}
			localCats={localCats}
			setLocalCats={setLocalCats}
		/>
	);
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
