import React from 'react';

import useStyles from './MostClickedIdeasSection.style';

const getAuthorsLastName = (author) => {
	const tempArr = author.split(' ');
	const lastName = tempArr[tempArr.length - 1];

	return lastName;
};

const MostClickedIdeasSectionView = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.mostClickedIdeas.length
				? props.mostClickedIdeas.map((pub) => (
						<section
							key={pub.id}
							className={classes.mostClickedIdeasWrapper}
							onClick={() => props.handleClick(pub.id, pub.categories)}
						>
							<div style={{ marginRight: '15px', marginTop: 5, marginBottom: 5 }}>
								<div className={classes.mostClickedIdeasTitle}>idea</div>
								<div className={classes.mostClickedIdeasContent}>
									{props.formatLongString(pub.title, 28)}
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									marginTop: 5,
									marginBottom: 5,
									height: '100% - 10px',
								}}
							>
								<div
									className={classes.mostClickedIdeasTitle}
									style={{ lineHeight: 0.9, marginBottom: 10 }}
								>
									{
										pub.categories?.find(
											(category) =>
												category.name !== 'idea' && category.name !== 'Ideas',
										).name
									}
								</div>
								<div
									className={classes.mostClickedIdeasTitle}
									style={{ fontSize: '1rem', fontStyle: 'italic' }}
								>
									{getAuthorsLastName(pub.author_name)}
								</div>
							</div>
						</section>
				  ))
				: null}
		</>
	);
};

MostClickedIdeasSectionView.displayName = 'MostClickedIdeasSectionView';
MostClickedIdeasSectionView.defaultProps = {};

export default React.memo(MostClickedIdeasSectionView);
