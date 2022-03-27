import React, { useState, useEffect, useCallback } from 'react';
import { useSelector,useDispatch } from 'react-redux';
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
				userInformation.phone=JSON.parse(userInformation.phone);
				console.log('userInformation', userInformation);
				setUserInformation(userInformation);
			}
		} catch (error) {}
	});

	useEffect(() => {
		alert('ndskn');
		dispatch(utilsAction.getUtilsAsync());
		fetchUserInformation();

	}, []);
	useEffect(() => {
		console.log(userInformation);
	}, [userInformation]);
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
		/>
	);
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
