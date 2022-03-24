import React from 'react';

import MemberTopbarView from './MemberTopbar.view';

const MemberTopbar = (props) => {
	return <MemberTopbarView classes={props.classes} options={props.options} />;
};

MemberTopbar.displayName = 'MemberTopbar';
MemberTopbar.defaultProps = {};

export default React.memo(MemberTopbar);
