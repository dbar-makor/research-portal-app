import React, { useState,useEffect,useCallback } from 'react';
import {useSelector } from 'react-redux';
import EditProfileView from './EditProfile.view';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../utils/constants';

const EditProfile = () => {
	const userContent = useSelector((state) => state.auth.userContent);
	console.log(userContent);
	const [avatar, setAvatar] = useState(
		'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	);
	const [fullName,setFullName] =useState('');
	const [userInformation,setUserInformation] = useState({});
	const fetchUserInformation = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/${userContent.id}`);
			if (res.status === 201 || res.status === 200) {
				setUserInformation(res.data);
			}
		} catch (error) {}
	});
	useEffect(() =>{
		fetchUserInformation();
	},[]);
	return <EditProfileView avatar={avatar}
  setAvatar={setAvatar}
	fullName={fullName}
	setFullName={setFullName}
	userInformation={userInformation}
  ></EditProfileView>;
};

EditProfile.displayName = 'EditProfile';
EditProfile.defaultProps = {};

export default React.memo(EditProfile);
