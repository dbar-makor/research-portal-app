import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Grid, IconButton, Typography } from '@material-ui/core';

import useStyles from './Pagination.style';

const PaginationView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center" className={classes.paginationBox}>
			<Grid item>
				<IconButton
					aria-label="ArrowBack"
					className={`${classes.doubleBtnPrev} ${classes.arrows}`}
					disabled={props.currentPage === 1}
					onClick={props.goToFirstPage}
				>
					<ArrowBackIosIcon className={classes.arrow} />
					<ArrowBackIosIcon className={`${classes.arrow} ${classes.secondArrowBack}`} />
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton
					aria-label="ArrowBack"
					className={classes.btn}
					disabled={props.currentPage === 1}
					onClick={props.handlePrev}
				>
					<ArrowBackIosIcon className={classes.arrow} />
				</IconButton>
			</Grid>

			<Grid item container xs={1} alignItems="center" justifyContent="center">
				<Typography variant="h5" className={classes.numbers}>
					{props.currentPage}
/
{props.allPages}
				</Typography>
			</Grid>
			<Grid item>
				<IconButton
					aria-label="ArrowForward"
					className={classes.btn}
					disabled={props.currentPage === props.allPages}
					onClick={props.handleNext}
				>
					<ArrowForwardIosIcon className={classes.arrow} />
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton
					aria-label="ArrowForward"
					className={classes.doubleBtnNext}
					disabled={props.currentPage === props.allPages}
					onClick={props.goToLastPage}
				>
					<ArrowForwardIosIcon className={`${classes.arrow} ${classes.secondArrowForward}`} />
					<ArrowForwardIosIcon className={classes.arrow} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

PaginationView.displayName = 'PaginationView';
PaginationView.defaultProps = {};

export default React.memo(PaginationView);
