/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setParams, setParamsPublication } from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';

import GeneralHomeView from './GeneralHome.view';

const GeneralHome = () => {
	const categories = useSelector((state) => state.categories.categories);
	const latestNewsId = categories?.find((categoryObj) => categoryObj.name === 'News')?.id;
	const morningNotesId = categories?.find((categoryObj) => categoryObj.name === 'Morning Notes')?.id;

	const industryRecoursedId = categories?.find(
		(categoryObj) => categoryObj.name === 'Industry Recoursed',
	)?.id;

	const focusIdeasId = categories?.find((categoryObj) => categoryObj.name === 'Focus Ideas')?.id;
	const [lastPublications, setLastPublications] = useState([]);
	const [latestNews, setLatestNews] = useState([]);
	const [morningNotes, setMorningNotes] = useState([]);
	const [industryRecoursed, setIndustryRecoursed] = useState([]);
	const [focusIdeas, setFocusIdeas] = useState([]);
	//const [events, setEvents] = useState([]);

	const date = new Date();

	const today = date.getDate();

	const calendarDefaultValue = {
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDay(),
	};

	const [selectedDay, setSelectedDay] = useState(calendarDefaultValue);
	const events = [1, 2, 3, 4, 5, 6, 7, 22];

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

	const fetchByCategory = useCallback(async (howMany, categoryId, categorySetter) => {
		try {
			const res = await axios.get(
				`${BASE_URL}${END_POINT.PUBLICATION}`,
				setParamsPublication(0, howMany, categoryId),
			);

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
		latestNewsId && fetchByCategory(5, latestNewsId, setLatestNews);
		morningNotesId && fetchByCategory(15, morningNotesId, setMorningNotes);
		industryRecoursedId && fetchByCategory(5, industryRecoursedId, setIndustryRecoursed);
		focusIdeasId && fetchByCategory(10, focusIdeasId, setFocusIdeas);
		fetchLastPublications(9);
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
				/>
			)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
