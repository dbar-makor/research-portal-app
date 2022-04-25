import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setParams, setParamsPublication, setParamsEvent } from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import GeneralHomeView from './GeneralHome.view';

const date = new Date();

const calendarDefaultValue = {
	year: date.getFullYear(),
	month: date.getMonth(),
	day: date.getDay(),
	today: date.getDate(),
};

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
	// const [month, setMonth] = useState(new Date().getMonth() + 1);
	// const [year, setYear] = useState(new Date().getFullYear());
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [eventsDays, setEventsDays] = useState([]);

	const isAuthorised = true;

	const [selectedDay, setSelectedDay] = useState(calendarDefaultValue);

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
			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, setParams(0, howMany));

			if (res.status === 200) {
				setLastPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	const fetchEventsByMonth = useCallback(async () => {
		try {
			const res = await axios.get(
				`${BASE_URL}${END_POINT.EVENT}`,
				setParamsEvent(date.getMonth() + 1, date.getFullYear()),
			);

			if (res.status === 200) {
				setEvents(res.data);
				const events = res.data;

				const days = events.map((event) => {
					return new Date(event.date).getDate();
				});

				setEventsDays(days);
			}
		} catch (error) {
			console.log(error);
		}
	});

	const fetchByCategory = useCallback(async (howMany, categoryId, categorySetter, orderBy) => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, {
				...setParamsPublication(0, howMany, categoryId, orderBy),
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
			ideasId && fetchByCategory(5, ideasId, setMostClickedIdeas, 'views');
			fetchLastPublications(9);
		}
	}, [categories]);

	useEffect(() => {
		fetchEventsByMonth();
	}, [date]);

	return (
		<>
			{categories?.length && (
				<GeneralHomeView
					eventsDays={eventsDays}
					calendarDefaultValue={calendarDefaultValue}
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
					events={events}
					date={date}
					setDate={setDate}
					handleClick={handleClick}
				/>
			)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
