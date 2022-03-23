import React from 'react';

import SmallPublicationView from './SmallPublication.view';

const SmallPublication = (props) => {
	return <SmallPublicationView publication={props.publication} />;
};

SmallPublication.displayName = 'SmallPublication';
SmallPublication.defaultProps = {};

export default React.memo(SmallPublication);
