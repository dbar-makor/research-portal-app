import React from 'react';
import Carousel from 'react-material-ui-carousel';

import useStyles from './CarouselSection.style';

const CarouselSectionView = (props) => {
	const classes = useStyles();

	return (
		<Carousel
			style={{ display: 'flex' }}
			navButtonsProps={{
				style: {
					backgroundColor: '#B8C3D8',
					borderRadius: '30px',
				},
			}}
			indicatorIconButtonProps={{
				style: {
					marginTop: 26,
					color: '#E2EBFC',
				},
			}}
			activeIndicatorIconButtonProps={{
				style: {
					color: '#1C67FF',
				},
			}}
		>
			{props.featuredPublications.length
				? props.featuredPublications.map((pub) => (
						<div
							key={pub.id}
							className={classes.carouselContect}
							onClick={() => props.handleClick(pub.id, pub.categories)}
						>
							{pub.title}
						</div>
				  ))
				: null}
		</Carousel>
	);
};

CarouselSectionView.displayName = 'CarouselSectionView';
CarouselSectionView.defaultProps = {};

export default React.memo(CarouselSectionView);
