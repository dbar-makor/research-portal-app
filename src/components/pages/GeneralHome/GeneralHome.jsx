import React, { useState, useEffect, useCallback } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setParams } from '../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../utils/constants';
//import * as utilsAction from '../../../redux/utils/utilsSlice';

import GeneralHomeView from './GeneralHome.view';

const GeneralHome = () => {
	// const [publications, setPublications] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [categories, setCategories] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [lastPublications, setLastPublications] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [latestNews, setlatestNews] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [morningNotes, setMorningNotes] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [industryRecoursed, setIndustryRecoursed] = useState([]);
	//const dispatch = useDispatch();

	//const categories = useSelector((state) => state.utils.utils.category);

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
				console.log('res.data.publications', res.data.publications);

				setLastPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	const fetchCategories = async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.ALLCATEGORIES}`);

			if (res.status === 200) {
				console.log('res.data', res.data);

				setCategories(res.data);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	};

	// eslint-disable-next-line no-unused-vars
	const fetchByCategory = useCallback(async (howMany, categoryId, categorySetter) => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}`, setParams(0, howMany));

			if (res.status === 200) {
				console.log('res.data.publications', res.data.publications);

				categorySetter(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	useEffect(() => {
		fetchCategories();
	}, []);

	// Calls to publications data

	useEffect(() => {
		console.log('categories', categories);
		//fetchCategory(5, categoryId, setLatestNews);
		// fetchMorningNotes(15);
		fetchLastPublications(9);
		//fetchIndustryRecoursed(5);
	}, []);

	return (
		<>
			<GeneralHomeView
				events={events}
				today={today}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>
			{console.log('categories', categories)}
		</>
	);
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
