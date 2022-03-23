import React from 'react';

import MediumPublicationView from './MediumPublication.view';

const MediumPublication = (props) => {
	return <MediumPublicationView publication={props.publication} />;
};

MediumPublication.displayName = 'MediumPublication';
MediumPublication.defaultProps = {};

export default React.memo(MediumPublication);
