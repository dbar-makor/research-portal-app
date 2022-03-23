import React, { useState, useEffect } from 'react';

import ControlBarView from './ControlBar.view';

const ControlBar = (props) => {
	const [localSearch, setLocalSearch] = useState('');

	const handleSearch = (e) => {
		if (e.key && e.key === 'Enter' && localSearch !== '') {
			props.setSearchTerm(localSearch);
		}
	};

	const handleClick = () => {
		props.makeAllRead();
	};

	useEffect(() => {
		if (localSearch === '') {
			props.setSearchTerm('');
		}
	}, [localSearch]);

	return (
		<ControlBarView
			setLocalSearch={setLocalSearch}
			handleSearch={handleSearch}
			handleClick={handleClick}
			localSearch={localSearch}
		/>
	);
};

ControlBar.displayName = 'ControlBar';
ControlBar.defaultProps = {};

export default React.memo(ControlBar);
