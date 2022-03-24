import React from 'react';

import SubscriberInfoView from './SubscriberInfo.view';

const SubscriberInfo = (props) => {
	return <SubscriberInfoView info={props.info} />;
};

SubscriberInfo.displayName = 'SubscriberInfo';
SubscriberInfo.defaultProps = {};

export default React.memo(SubscriberInfo);
