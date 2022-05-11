import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { setParamsEvent } from '../../../../../utils/helpers/helperFunctions';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import EventsSectionView from './EventsSection.view';

const EventsSection = (props) => {
	const thisDate = new Date();

	const calendarDefaultValue = {
		year: thisDate.getFullYear(),
		month: thisDate.getMonth(),
		day: thisDate.getDay(),
		today: thisDate.getDate(),
	};

	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [eventsDays, setEventsDays] = useState([]);
	const [highlightedDate, setHighlightedDate] = useState(0);
	const [eventsTabValue, setEventsTabValue] = useState('upcoming');
	const [selectedDay, setSelectedDay] = useState(calendarDefaultValue);
	const dispatch = useDispatch();

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

	useEffect(() => {
		fetchEventsByMonth();
	}, [date]);

	const handleEventsTabChange = (e, newValue) => {
		setEventsTabValue(newValue);

		fetchEventsByMonth();
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
		<EventsSectionView
			fetchEventsByMonth={fetchEventsByMonth}
			setDate={setDate}
			events={events}
			calendarDefaultValue={calendarDefaultValue}
			eventsDays={eventsDays}
			formatLongString={props.formatLongString}
			highlightedDate={highlightedDate}
			isAuthenticated={props.isAuthenticated}
			setHighlightedDate={setHighlightedDate}
			eventsTabValue={eventsTabValue}
			setEventsTabValue={setEventsTabValue}
			selectedDay={selectedDay}
			setSelectedDay={setSelectedDay}
			handleEventsTabChange={handleEventsTabChange}
			handleDayMouse={handleDayMouse}
			handleMarkEvent={handleMarkEvent}
		/>
	);
};

EventsSection.displayName = 'EventsSection';
EventsSection.defaultProps = {};

export default React.memo(EventsSection);
