import React from 'react';

import MainPublicationView from './MainPublication.view';

const MainPublication = (props) => {
	return <MainPublicationView publication={props.publication} />;
};

MainPublication.displayName = 'MainPublication';
MainPublication.defaultProps = {};

export default React.memo(MainPublication);
