import React from 'react';
import { format } from 'date-fns';
import useStyles from './LatestNewsSection.style';

const LatestNewsSectionView = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.latestNews.length
				? props.latestNews.map((pub) => (
						<section
							key={pub.id}
							className={classes.latestNewsWrapper}
							onClick={() => props.handleClick(pub.id, pub.categories)}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<div className={classes.latestNewsHeader}>{pub.author_name}</div>
								<div className={classes.latestNewsHeader}>
									{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
								</div>
							</div>
							<div>
								<div className={classes.latestNewsContent}>
									{props.formatLongString(pub.title, 30)}
								</div>
							</div>
						</section>
				  ))
				: null}
		</>
	);
};

LatestNewsSectionView.displayName = 'LatestNewsSectionView';
LatestNewsSectionView.defaultProps = {};

export default React.memo(LatestNewsSectionView);
