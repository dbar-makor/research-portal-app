import React from 'react';

import SubHeaderModalView from './SubHeaderModal.view';

const SubHeaderModal = (props) => {
	return <SubHeaderModalView title={props.title} />;
};

SubHeaderModal.displayName = 'SubHeaderModal';
SubHeaderModal.defaultProps = {};

export default React.memo(SubHeaderModal);
