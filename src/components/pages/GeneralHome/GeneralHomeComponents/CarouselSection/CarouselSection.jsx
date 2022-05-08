import React, { useEffect, useState } from 'react';

import CarouselSectionView from './CarouselSection.view';

const CarouselSection = (props) => {
	const featuredId = props.categories?.find((categoryObj) => categoryObj.name === 'Featured')?.id;
	const [featuredPublications, setFeaturedPublications] = useState([]);

	useEffect(() => {
		if (props.categories.length) {
			featuredId && props.fetchByCategory(3, featuredId, setFeaturedPublications);
		}
	}, [props.categories]);

	return (
		<CarouselSectionView featuredPublications={featuredPublications} handleClick={props.handleClick} />
	);
};

CarouselSection.displayName = 'CarouselSection';
CarouselSection.defaultProps = {};

export default React.memo(CarouselSection);
