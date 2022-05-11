import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setParamsPublication } from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import GeneralHomeView from './GeneralHome.view';

const GeneralHome = () => {
	const categories = useSelector((state) => state.categories.categories);
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAuthor = useSelector((state) => state.auth.userContent?.type === 'author');

	const isMember = useSelector(
		(state) => state.auth.userContent?.type === 'client' || state.auth.userContent?.type === 'prospect',
	);

	const [openAlert, setOpenAlert] = useState(false);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [actionName, setActionName] = useState('');

	const isAuthorised = true;

	const whereToLink = (pubId) => {
		if (!isAuthenticated) {
			return '/login';
		} else if (isAuthorised && isMember) {
			return `/article/${pubId}`;
		} else if (!isAuthorised && isMember) {
			console.log('/not-authorised');

			return '/not-authorised';
		} else if (isAuthor) {
			return '/prearticle';
		}
	};

	const handleAction = () => {
		if (actionName === 'Edit Settings') {
			history.push('/settings');
		} else {
			history.push('/home');
		}

		setOpenAlert(false);
	};

	const handleClick = (pubId, categories) => {
		if (!categories) {
			categories = [];
		}

		localStorage.setItem('articleId', JSON.stringify(pubId));

		if (!isAuthenticated) {
			history.push({ pathname: whereToLink(pubId), state: { id: pubId, to: whereToLink(pubId) } });

			return;
		}

		const userContent = JSON.parse(localStorage.getItem('userContent'));
		const userCategories = userContent.categories.map((item) => item.id);

		if (userContent.type === 'prospect' || userContent.type === 'client') {
			const isSuscribed = categories.some((c) => userCategories.includes(c.id));

			if (isSuscribed) {
				history.push({ pathname: whereToLink(pubId), state: { id: pubId, to: whereToLink(pubId) } });

				return;
			} else {
				const companyCategories = userContent.company_categories.map((item) => item.id);
				//is not Suscribe check if permitted
				const isPermitted = categories.some((c) => companyCategories.includes(c.id));

				if (isPermitted) {
					setActionName('Edit Settings');
					setTitle('You are not suscribed');
					setText('You need to suscribe to this categories in your Profile');
				} else {
					setActionName('Back to Home');
					setTitle('You dont have access');
					setText(
						// eslint-disable-next-line quotes
						"You dont have access to this article since your company is not registered to this article's categories",
					);
				}
			}
		} else {
			const isSuscribe = categories.some((c) => userCategories.includes(c.id));

			if (isSuscribe) {
				history.push({ pathname: whereToLink(pubId), state: { id: pubId, to: whereToLink(pubId) } });

				return;
			} else {
				setActionName('Edit Settings');
				setTitle('You are not suscribed');
				setText('You need to suscribe to this categories in your Profile');
			}
		}

		setOpenAlert(true);
	};

	const handleClose = () => {
		setOpenAlert(false);
	};

	const fetchByCategory = useCallback(async (howMany, categoryId, categorySetter, orderBy, region) => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, {
				...setParamsPublication(0, howMany, categoryId, orderBy, region),
			});

			if (res.status === 200) {
				categorySetter(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	return (
		<>
			{categories?.length && (
				<GeneralHomeView
					categories={categories}
					isAuthenticated={isAuthenticated}
					fetchByCategory={fetchByCategory}
					openAlert={openAlert}
					handleClose={handleClose}
					title={title}
					text={text}
					actionName={actionName}
					handleAction={handleAction}
					handleClick={handleClick}
				/>
			)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
