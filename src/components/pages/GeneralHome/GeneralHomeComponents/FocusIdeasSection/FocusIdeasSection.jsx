import React, { useState, useEffect } from 'react';

import FocusIdeasSectionView from './FocusIdeasSection.view';

const FocusIdeasSection = (props) => {
	const [focusIdeas, setFocusIdeas] = useState([]);
	const focusIdeasId = props.categories?.find((categoryObj) => categoryObj.name === 'Focus Ideas')?.id;

	useEffect(() => {
		if (props.categories.length) {
			focusIdeasId && props.fetchByCategory(10, focusIdeasId, setFocusIdeas);
		}
	}, [props.categories]);

	return (
		<FocusIdeasSectionView
			formatLongString={props.formatLongString}
			focusIdeas={focusIdeas}
			handleClick={props.handleClick}
		/>
	);
};

FocusIdeasSection.displayName = 'FocusIdeasSection';
FocusIdeasSection.defaultProps = {};

export default React.memo(FocusIdeasSection);
