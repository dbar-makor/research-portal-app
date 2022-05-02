import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	// setParams,
	setParamsPublication,
	setParamsEvent,
} from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import GeneralHomeView from './GeneralHome.view';

const date = new Date();

const calendarDefaultValue = {
	year: date.getFullYear(),
	month: date.getMonth(),
	day: date.getDay(),
	today: date.getDate(),
};

const GeneralHome = () => {
	const dispatch = useDispatch();

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
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [eventsDays, setEventsDays] = useState([]);
	const [highlightedDate, setHighlightedDate] = useState(0);
	const [eventsTabValue, setEventsTabValue] = useState('upcoming');
	const [lastPublicationsTabValue, setLastPublicationsTabValue] = useState('Asia-Pacific');
	const [morningNotesTabValue, setMorningNotesTabValue] = useState('Asia-Pacific');
	const [openAlert, setOpenAlert] = useState(false);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [actionName, setActionName] = useState('');
	//const [eventHovered, setEventHovered] = useState(false);

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
			const isSuscribe = categories.some((c) => userCategories.includes(c.id));

			if (isSuscribe) {
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
						'You dont have access to this article since your company is not registered to this article\'s categories',
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

	const fetchLastPublications = useCallback(async (howMany, region) => {
		try {
			const res = await axios.get(
				`${BASE_URL}${END_POINT.PUBLICATION}`,
				setParamsPublication(0, howMany, null, null, region),
			);

			if (res.status === 200) {
				setLastPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	const fetchEventsByMonth = useCallback(async (marked) => {
		try {
			let res;
			const token = localStorage.getItem('token');

			if (!marked) {
				res = await axios.get(
					`${BASE_URL}${END_POINT.EVENT}`,
					setParamsEvent(date.getMonth() + 1, date.getFullYear()),
				);
			} else {
				res = await axios.get(`${BASE_URL}${END_POINT.EVENT}/mark`, {
					...setParamsEvent(date.getMonth() + 1, date.getFullYear()),
					headers: { Authorization: token },
				});
			}

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

	// Calls to publications data
	useEffect(() => {
		if (categories.length) {
			latestNewsId && fetchByCategory(5, latestNewsId, setLatestNews);
			industryRecoursedId && fetchByCategory(5, industryRecoursedId, setIndustryRecoursed);
			focusIdeasId && fetchByCategory(10, focusIdeasId, setFocusIdeas);
			featuredId && fetchByCategory(3, featuredId, setFeaturedPublications);
			ideasId && fetchByCategory(5, ideasId, setMostClickedIdeas, 'views');
		}
	}, [categories]);

	useEffect(() => {
		categories.length &&
			morningNotesId &&
			fetchByCategory(5, morningNotesId, setMorningNotes, null, morningNotesTabValue);
	}, [categories, morningNotesTabValue]);

	useEffect(() => {
		fetchLastPublications(3, lastPublicationsTabValue);
	}, [lastPublicationsTabValue]);

	useEffect(() => {
		fetchEventsByMonth();
	}, [date]);

	const handleEventsTabChange = (e, newValue) => {
		setEventsTabValue(newValue);

		fetchEventsByMonth();
	};

	const handleLastPublicationTabChange = (e, newValue) => {
		setLastPublicationsTabValue(newValue);
	};

	const handleMorningNotsTabChange = (e, newValue) => {
		setMorningNotesTabValue(newValue);

		// if (newValue === 'asia-pacific') {
		// 	console.log('asia-pacific');
		// } else if (newValue === 'europe') {
		// 	console.log('europe');
		// } else {
		// 	console.log('united-states');
		// }
	};

	const handleDayMouse = (date, marker) => {
		const day = date.getDate();

		if (eventsDays.includes(day) && marker === 'enter') {
			setHighlightedDate(day);
		}

		if (marker === 'leave') {
			setHighlightedDate(0);
		}
	};

	const handleMarkEvent = async (id, type) => {
		try {
			let res;
			const token = localStorage.getItem('token');

			if (type === 'upcoming') {
				res = await axios.post(
					`${BASE_URL}${END_POINT.EVENT}/mark`,
					{ event_id: id },
					{ headers: { Authorization: token } },
				);

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully marked event', 2000));
				}
			}

			if (type === 'marked') {
				res = await axios.delete(`${BASE_URL}${END_POINT.EVENT}/unmark`, {
					params: { event_id: id },
					headers: { Authorization: token },
				});

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully unmarked event', 2000));
					fetchEventsByMonth(true);
				}
			}
		} catch (error) {
			if (!error.response.data.success) {
				dispatch(actionSnackBar.setSnackBar('error', error.response.data.message, 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'somthing went worng', 2000));
			}
		}
	};

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
					eventsTabValue={eventsTabValue}
					highlightedDate={highlightedDate}
					lastPublicationsTabValue={lastPublicationsTabValue}
					morningNotesTabValue={morningNotesTabValue}
					openAlert={openAlert}
					handleClose={handleClose}
					title={title}
					text={text}
					actionName={actionName}
					fetchEventsByMonth={fetchEventsByMonth}
					handleAction={handleAction}
					handleClick={handleClick}
					handleEventsTabChange={handleEventsTabChange}
					handleLastPublicationTabChange={handleLastPublicationTabChange}
					handleMorningNotsTabChange={handleMorningNotsTabChange}
					handleDayMouse={handleDayMouse}
					handleMarkEvent={handleMarkEvent}
				/>
			)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
