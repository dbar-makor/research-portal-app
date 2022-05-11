import React, { useState, useEffect } from 'react';

import IndustryRecoursedSectionView from './IndustryRecoursedSection.view';

const IndustryRecoursedSection = (props) => {
	const industryRecoursedId = props.categories?.find(
		(categoryObj) => categoryObj.name === 'Industry Recoursed',
	)?.id;

	const [industryRecoursed, setIndustryRecoursed] = useState([]);

	useEffect(() => {
		if (props.categories.length) {
			industryRecoursedId && props.fetchByCategory(6, industryRecoursedId, setIndustryRecoursed);
		}
	}, [props.categories]);

	return (
		<IndustryRecoursedSectionView industryRecoursed={industryRecoursed} handleClick={props.handleClick} />
	);
};

IndustryRecoursedSection.displayName = 'IndustryRecoursedSection';
IndustryRecoursedSection.defaultProps = {};

export default React.memo(IndustryRecoursedSection);
