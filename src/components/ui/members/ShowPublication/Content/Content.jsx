import React from 'react';

import ContentView from './Content.view';

const Content = (props) => {
	return <ContentView contentBlocks={props.contentBlocks} />;
};

Content.displayName = 'Content';
Content.defaultProps = {};

export default React.memo(Content);
