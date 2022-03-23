import React from 'react';

import SubHeaderView from './SubHeader.view';

const SubHeader = (props) => {
	return <SubHeaderView title={props.title} />;
};

SubHeader.displayName = 'SubHeader';
SubHeader.defaultProps = {};

export default React.memo(SubHeader);
