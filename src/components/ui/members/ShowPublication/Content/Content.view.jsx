import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/PublicationsStyles';

import StyledEditor from './Content.style';

const ContentView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider} style={{ marginTop: 10 }} />
			<Grid container>
				{props.contentBlock !== '{}' ? (
					<StyledEditor
						defaultValue={
							typeof props.contentBlocks === 'object'
								? JSON.stringify(props.contentBlocks)
								: props.contentBlocks
						}
						controls={[]}
						readOnly
					/>
				) : (
					<Typography>No Content</Typography>
				)}
			</Grid>
		</Grid>
	);
};

ContentView.displayName = 'ContentView';
ContentView.defaultProps = {};

export default React.memo(ContentView);
