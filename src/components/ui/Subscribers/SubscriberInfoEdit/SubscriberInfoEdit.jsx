import React from 'react';

import SubscriberInfoEditView from './SubscriberInfoEdit.view';

const SubscriberInfoEdit = (props) => {
	return <SubscriberInfoEditView info={props.info} />;
};

SubscriberInfoEdit.displayName = 'SubscriberInfoEdit';
SubscriberInfoEdit.defaultProps = {};

export default React.memo(SubscriberInfoEdit);
