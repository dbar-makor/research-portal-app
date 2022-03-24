import React, { useState } from 'react';
import GeneralHomeView from './GeneralHome.view';

const GeneralHome = () => {
	const date = new Date();

	const calendarDefaultValue = {
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDay(),
	};

	const [selectedDay, setSelectedDay] = useState(calendarDefaultValue);
	const events = [1, 2, 3, 4, 5, 6, 7, 22];

	return <GeneralHomeView events={events} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />;
};

GeneralHome.displayName = 'MemberHome';
GeneralHome.defaultProps = {};

export default React.memo(GeneralHome);
