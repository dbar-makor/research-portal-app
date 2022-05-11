import React, { useState, useEffect } from 'react';

import LatestNewsSectionView from './LatestNewsSection.view';

const LatestNewsSection = (props) => {
	const [latestNews, setLatestNews] = useState([]);

	const latestNewsId = props.categories?.find((categoryObj) => categoryObj.name === 'News')?.id;

	useEffect(() => {
		if (props.categories.length) {
			latestNewsId && props.fetchByCategory(5, latestNewsId, setLatestNews);
		}
	}, [props.categories]);

	return (
		<LatestNewsSectionView
			latestNews={latestNews}
			formatLongString={props.formatLongString}
			handleClick={props.handleClick}
		/>
	);
};

LatestNewsSection.displayName = 'LatestNewsSection';
LatestNewsSection.defaultProps = {};

export default React.memo(LatestNewsSection);
