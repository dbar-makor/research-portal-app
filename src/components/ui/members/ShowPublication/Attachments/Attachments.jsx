import React from 'react';

import AttachmentsView from './Attachments.view';

const Attachments = (props) => {
	return <AttachmentsView attachments={props.attachments} />;
};

Attachments.displayName = 'Attachments';
Attachments.defaultProps = {};

export default React.memo(Attachments);
