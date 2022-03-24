import React from 'react';

import TitleView from './Title.view';

const Title = (props) => {
	return <TitleView title={props.title} description={props.description} />;
};

Title.displayName = 'Title';
Title.defaultProps = {};

export default React.memo(Title);
