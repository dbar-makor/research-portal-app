import React, { useState, useEffect } from 'react';

import MostClickedIdeasSectionView from './MostClickedIdeasSection.view';

const MostClickedIdeasSection = (props) => {
	const [mostClickedIdeas, setMostClickedIdeas] = useState([]);
	const ideasId = props.categories?.find((categoryObj) => categoryObj.name === 'Ideas')?.id;

	useEffect(() => {
		if (props.categories.length) {
			ideasId && props.fetchByCategory(5, ideasId, setMostClickedIdeas, 'views');
		}
	}, [props.categories]);

	return (
		<MostClickedIdeasSectionView
			mostClickedIdeas={mostClickedIdeas}
			handleClick={props.handleClick}
			formatLongString={props.formatLongString}
		/>
	);
};

MostClickedIdeasSection.displayName = 'MostClickedIdeasSection';
MostClickedIdeasSection.defaultProps = {};

export default React.memo(MostClickedIdeasSection);
