import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AuthorTopbarView = (props) => {
	return (
		<Grid item xs={12}>
			<Grid container justifyContent="flex-end">
				<Grid item style={{ paddingRight: '20px' }}>
					<Link to="/research" className={props.classes.styledLinks}>
						My Articles
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

AuthorTopbarView.displayName = 'AuthorTopbarView';
AuthorTopbarView.defaultProps = {};

export default React.memo(AuthorTopbarView);
