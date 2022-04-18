import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Grid, IconButton, Typography } from '@material-ui/core';

import useStyles from './Pagination.style';

const PaginationView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center">
			<Grid item>
				<IconButton aria-label="ArrowBack" className={classes.arrows}>
					<ArrowBackIosIcon fontSize="large" />
					<ArrowBackIosIcon fontSize="large" className={classes.secondArrowBack} />
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton aria-label="ArrowBack">
					<ArrowBackIosIcon fontSize="large" />
				</IconButton>
			</Grid>

			<Grid item>
				<Typography variant="h5">
					{props.page}
/
{props.allPages}
				</Typography>
			</Grid>
			<Grid item>
				<IconButton aria-label="ArrowForward">
					<ArrowForwardIosIcon fontSize="large" />
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton aria-label="ArrowForward">
					<ArrowForwardIosIcon fontSize="large" className={classes.secondArrowForward} />
					<ArrowForwardIosIcon fontSize="large" />
				</IconButton>
			</Grid>
		</Grid>
	);
};

PaginationView.displayName = 'PaginationView';
PaginationView.defaultProps = {};

export default React.memo(PaginationView);
