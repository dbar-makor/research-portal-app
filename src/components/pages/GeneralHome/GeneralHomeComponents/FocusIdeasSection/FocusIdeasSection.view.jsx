import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';

import useStyles from './FocusIdeasSection.style';

const FocusIdeasSectionView = (props) => {
	const classes = useStyles();

	return (
		<>
			{props.focusIdeas.length
				? props.focusIdeas.map((pub) => (
						<section
							key={pub.id}
							className={classes.focusIdeasWrapper}
							onClick={() => props.handleClick(pub.id)}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										className={classes.focusIdeasChip}
										label={pub.tags?.[0] ? pub.tags?.[0].name : ''}
										style={pub.tags?.[0] ? {} : { visibility: 'hidden' }}
									/>
									<Chip
										className={classes.focusIdeasChip}
										label={pub.tags?.[1] ? pub.tags?.[1].name : ''}
										style={pub.tags?.[1] ? {} : { visibility: 'hidden' }}
									/>
								</Stack>
								<div className={classes.focusIdeasDate}>
									{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
								</div>
							</div>
							<div>
								<div className={classes.focusIdeasContent}>
									{`${pub.author_name} |`}
									&nbsp;
									<span style={{ color: '#000' }}>
										{props.formatLongString(pub.title, 38)}
									</span>
								</div>
							</div>
						</section>
				  ))
				: null}
		</>
	);
};

FocusIdeasSectionView.displayName = 'FocusIdeasSectionView';
FocusIdeasSectionView.defaultProps = {};

export default React.memo(FocusIdeasSectionView);
