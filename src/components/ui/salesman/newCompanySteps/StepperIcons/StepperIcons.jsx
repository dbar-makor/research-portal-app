import React from 'react';

import StepperIconsView from './StepperIcons.view';

const StepperIcons = (props) => {
	return <StepperIconsView active={props.active} completed={props.completed} />;
};

StepperIcons.displayName = 'StepperIcons';
StepperIcons.defaultProps = {};

export default React.memo(StepperIcons);
