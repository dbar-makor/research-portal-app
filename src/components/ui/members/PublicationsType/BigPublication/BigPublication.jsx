import React from 'react';

import BigPublicationView from './BigPublication.view';

const BigPublication = (props) => {
	return <BigPublicationView publication={props.publication} />;
};

BigPublication.displayName = 'BigPublication';
BigPublication.defaultProps = {};

export default React.memo(BigPublication);
