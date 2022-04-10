import React, { useState } from 'react';

import MemberTopbarView from './MemberTopbar.view';

const MemberTopbar = (props) => {
	const [region, setRegion] = useState(props.options[0].value);
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<MemberTopbarView
			classes={props.classes}
			options={props.options}
			region={region}
			setRegion={setRegion}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
		/>
	);
};

MemberTopbar.displayName = 'MemberTopbar';
MemberTopbar.defaultProps = {};

export default React.memo(MemberTopbar);
