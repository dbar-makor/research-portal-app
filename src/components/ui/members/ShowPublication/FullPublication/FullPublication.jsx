import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import FullPublicationView from './FullPublication.view';

const FullPublication = () => {
	const dispatch = useDispatch();
	const { pubId } = useParams();
	const location = useLocation();
	const userType = useSelector((state) => state.auth.userContent?.type);
	// Local state for article id- the source for it varies
	const [id, setId] = useState(localStorage.getItem('articleId') || '');
	const [chosenPublication, setChosenPublication] = useState(null);
	const [loadingPub, setLoadingPub] = useState(null);

	const getPublication = async (id) => {
		setLoadingPub(true);

		if (id !== undefined) {
			try {
				const token = localStorage.getItem('token');

				const resp = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/${id}`, {
					headers: { Authorization: token },
				});

				if (resp.status === 200) {
					setLoadingPub(false);
					setChosenPublication(resp.data);
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'Faild to load publications', 2000));
			}
		}
	};

	const updateView = async (id) => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.put(
				`${BASE_URL}${END_POINT.PUBLICATION}/view/${id}`,
				{},
				{
					headers: { Authorization: token },
				},
			);

			if (res.status === 201) {
				// eslint-disable-next-line no-console
				console.log('res', res);
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log('err', err);
		}
	};

	useEffect(() => {
		let tempId = id || '';

		if (userType === 'author') {
			if (localStorage.getItem('presentation-article')) {
				const article = JSON.parse(localStorage.getItem('presentation-article'));

				setId(article.id);
				setChosenPublication(article);

				return;
			} else {
				// When coming from homepage (not from new article form) - id is sent with history.push;
				//when refreshing- id comes from localStorage
				tempId = location.state.id || JSON.parse(localStorage.getItem('articleId'));
			}
		} else if (userType === 'client' || userType === 'prospect') {
			// In case pubId from params is undefined as not coming from a Link component

			tempId = pubId || location.state.id || JSON.parse(localStorage.getItem('articleId'));
		}

		if (tempId) {
			localStorage.setItem('articleId', JSON.stringify(tempId));
			setId(tempId);
			getPublication(tempId);
			updateView(tempId);
		}
	}, []);

	// When component unmouts, localStorage gets cleared
	// useEffect(() => {
	// 	return () => {
	// 	if(location.pathname !== `/article/${id}`){
	// 		console.log('location.pathname', location.pathname)
	// 		localStorage.removeItem('presentation-article');
	// 		localStorage.removeItem('articleId');}
	// 	};
	// }, []);

	//When tab is closed, localStorage gets cleared
	// useEffect(() => {
	// 	window.onbeforeunload = () => {
	// 		localStorage.removeItem('presentation-article');
	// 		localStorage.removeItem('articleId');
	// 	};
	// }, []);

	const transformVideoLink = (link) => {
		if (link !== null) {
			const embedLink = link.replace('watch?v=', 'embed/');

			return embedLink;
		} else {
			return null;
		}
	};

	// useEffect(() => {
	// 	if (userType === 'client' || userType === 'prospect') {
	// 		// In case pubId from params is undefined as not coming from a Link component
	// 		const id = pubId || location.state.id || JSON.parse(localStorage.getItem('articleId'));

	// 		getPublication(id);
	// 	}
	// }, []);

	return (
		<FullPublicationView
			loadingPub={loadingPub}
			transformVideoLink={transformVideoLink}
			//backToEditing={backToEditing}
			chosenPublication={chosenPublication}
			userType={userType}
		/>
	);
};

FullPublication.displayName = 'FullPublication';
FullPublication.defaultProps = {};

export default React.memo(FullPublication);
