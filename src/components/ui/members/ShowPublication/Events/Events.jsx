import React from 'react';

import EventsView from './Events.view';

const Events = (props) => {
	return <EventsView events={props.events} />;
};

Events.displayName = 'Events';
Events.defaultProps = {};

export default React.memo(Events);
