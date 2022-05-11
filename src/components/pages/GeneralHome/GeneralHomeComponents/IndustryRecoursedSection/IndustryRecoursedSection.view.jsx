import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import useStyles from './IndustryRecoursedSection.style';

const IndustryRecoursedSectionView = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.industryRecoursed.length
				? props.industryRecoursed.map((pub) => (
						<section
							key={pub.id}
							className={classes.industryRecoursedWrapper}
							onClick={() => props.handleClick(pub.id, pub.categories)}
						>
							<div className={classes.industryRecoursedUpperRow}>
								{pub.tags?.length ? (
									<Stack className={classes.industryRecoursedStack}>
										<Chip
											className={classes.industryRecoursedChip}
											label={pub.tags?.[0] ? pub.tags?.[0].name : ''}
											style={pub.tags?.[0] ? {} : { visibility: 'hidden' }}
										/>
										<Chip
											className={classes.industryRecoursedChip}
											label={pub.tags?.[1] ? pub.tags?.[1].name : ''}
											style={pub.tags?.[1] ? {} : { visibility: 'hidden' }}
										/>
									</Stack>
								) : null}
								<div className={classes.industryRecoursedDate}>
									{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
								</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									{`${pub.author_name}:`}
									&nbsp;
									<span style={{ fontWeight: 'bold' }}>{pub.title}</span>
								</div>
							</div>
						</section>
				  ))
				: null}
		</>
	);
};

IndustryRecoursedSectionView.displayName = 'IndustryRecoursedSectionView';
IndustryRecoursedSectionView.defaultProps = {};

export default React.memo(IndustryRecoursedSectionView);
