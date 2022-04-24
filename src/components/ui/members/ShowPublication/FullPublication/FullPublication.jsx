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

	const [chosenPublication, setChosenPublication] = useState(() => {
		if (userType === 'author') {
			if (localStorage.getItem('presentation-article')) {
				return JSON.parse(localStorage.getItem('presentation-article'));
			} else {
				return null;
			}
		} else {
			return null;
		}
	});

	const [loadingPub, setLoadingPub] = useState(null);

	const getPublication = async (id) => {
		setLoadingPub(true);

		if (id !== undefined) {
			//should stay here?..........................................?
			const token = localStorage.getItem('token');

			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			//----------------------------------------------------------------------------------------
			const resp = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/${id}`);

			try {
				if (resp.status === 200) {
					setLoadingPub(false);
					setChosenPublication(resp.data);
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'Faild to load publications', 2000));
			}
		}
	};

	useEffect(() => {
		if (userType === 'author') {
			//setChosenPublication(JSON.parse(localStorage.getItem('presentation-article')));

			// When coming from homepage (not from new article form) - id is sent with history.push;
			//when refreshing- id comes from localStorage

			if (!chosenPublication) {
				const id = location.state.id || JSON.parse(localStorage.getItem('articleId'));

				getPublication(id);
			}
		}
	}, []);

	// When component unmouts, localStorage gets cleared
	useEffect(() => {
		return () => {
			localStorage.removeItem('presentation-article');
			localStorage.removeItem('articleId');
		};
	}, []);

	// When tab is closed, localStorage gets cleared
	useEffect(() => {
		window.onbeforeunload = () => {
			localStorage.removeItem('presentation-article');
			localStorage.removeItem('articleId');
		};
	}, []);

	const transformVideoLink = (link) => {
		if (link !== null) {
			const embedLink = link.replace('watch?v=', 'embed/');

			return embedLink;
		} else {
			return null;
		}
	};

	useEffect(() => {
		if (userType === 'client' || userType === 'prospect') {
			// In case pubId from params is undefined as not coming from a Link component
			const id = pubId || location.state.id || JSON.parse(localStorage.getItem('articleId'));

			getPublication(id);
		}
	}, []);

	// const backToEditing = () => {
	// 	history.push({
	// 		pathname: chosenPublication.type === 'live' ? '/new-article' : '/upload-article',
	// 		state: { publication: location.state?.publication, from: 'prearticle' },
	// 	});
	// };

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
