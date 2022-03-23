import React from 'react';

import ReplyView from './Reply.view';

const Reply = (props) => {
	return <ReplyView reply={props.reply} />;
};

Reply.displayName = 'Reply';
Reply.defaultProps = {};

export default React.memo(Reply);
