import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setParams, setParamsPublication } from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import GeneralHomeView from './GeneralHome.view';

const GeneralHome = () => {
	const categories = useSelector((state) => state.categories.categories);
	const latestNewsId = categories?.find((categoryObj) => categoryObj.name === 'News')?.id;
	const morningNotesId = categories?.find((categoryObj) => categoryObj.name === 'Morning Notes')?.id;
	const featuredId = categories?.find((categoryObj) => categoryObj.name === 'Featured')?.id;
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAuthor = useSelector((state) => state.auth.userContent?.type === 'author');

	const isMember = useSelector(
		(state) => state.auth.userContent?.type === 'client' || state.auth.userContent?.type === 'prospect',
	);

	const industryRecoursedId = categories?.find(
		(categoryObj) => categoryObj.name === 'Industry Recoursed',
	)?.id;

	const focusIdeasId = categories?.find((categoryObj) => categoryObj.name === 'Focus Ideas')?.id;
	const ideasId = categories?.find((categoryObj) => categoryObj.name === 'Ideas')?.id;
	const [lastPublications, setLastPublications] = useState([]);
	const [latestNews, setLatestNews] = useState([]);
	const [morningNotes, setMorningNotes] = useState([]);
	const [industryRecoursed, setIndustryRecoursed] = useState([]);
	const [focusIdeas, setFocusIdeas] = useState([]);
	const [featuredPublications, setFeaturedPublications] = useState([]);
	const [mostClickedIdeas, setMostClickedIdeas] = useState([]);

	const isAuthorised = true;

	const date = new Date();

	const today = date.getDate();

	const calendarDefaultValue = {
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDay(),
	};

	const [selectedDay, setSelectedDay] = useState(calendarDefaultValue);
	const events = [1, 2, 3, 4, 5, 6, 7, 22];

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

	const handleClick = (pubId) => {
		localStorage.setItem('articleId', JSON.stringify(pubId));
		history.push({ pathname: whereToLink(pubId), state: { id: pubId, to: whereToLink(pubId) } });
	};

	const fetchLastPublications = useCallback(async (howMany) => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, setParams(0, howMany), {
				headers: { Authorization: token },
			});

			if (res.status === 200) {
				setLastPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	const fetchByCategory = useCallback(async (howMany, categoryId, categorySetter) => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, {
				...setParamsPublication(0, howMany, categoryId),
				headers: { Authorization: token },
			});

			if (res.status === 200) {
				categorySetter(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	// Calls to publications data
	useEffect(() => {
		if (categories.length) {
			latestNewsId && fetchByCategory(5, latestNewsId, setLatestNews);
			morningNotesId && fetchByCategory(15, morningNotesId, setMorningNotes);
			industryRecoursedId && fetchByCategory(5, industryRecoursedId, setIndustryRecoursed);
			focusIdeasId && fetchByCategory(10, focusIdeasId, setFocusIdeas);
			featuredId && fetchByCategory(3, featuredId, setFeaturedPublications);
			ideasId && fetchByCategory(5, ideasId, setMostClickedIdeas);
			fetchLastPublications(9);
		}
	}, [categories]);

	return (
		<>
			{categories?.length && (
				<GeneralHomeView
					events={events}
					today={today}
					selectedDay={selectedDay}
					setSelectedDay={setSelectedDay}
					lastPublications={lastPublications}
					latestNews={latestNews}
					morningNotes={morningNotes}
					industryRecoursed={industryRecoursed}
					focusIdeas={focusIdeas}
					featuredPublications={featuredPublications}
					mostClickedIdeas={mostClickedIdeas}
					isAuthenticated={isAuthenticated}
					whereToLink={whereToLink}
					handleClick={handleClick}
				/>
			)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
