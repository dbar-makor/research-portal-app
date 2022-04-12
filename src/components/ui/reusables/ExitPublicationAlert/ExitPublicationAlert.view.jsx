import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { RedFilledButton } from '../../../../styles/MainStyles';

const ExitPublicationAlertView = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.open}
			classes={{ paper: classes.alertModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
			onClose={props.handleClose}
		>
			<Grid container>
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon className={classes.closeIcon} onClick={props.handleClose} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteTitle}>
						{`Deleting ${props.itemCategory}`}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteText}>
						{`Are you sure you want to delete ${props.itemName}?`}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<RedFilledButton
							onClick={() => {
								props.setNavigationAllowed(true);
								props.handleClose();
							}}
						>
							Delete
						</RedFilledButton>
						<RedFilledButton
							onClick={() => {
								props.setNavigationAllowed(false);
								props.handleClose();
							}}
						>
							Keep
						</RedFilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

ExitPublicationAlertView.displayName = 'ExitPublicationAlertView';
ExitPublicationAlertView.defaultProps = {};

export default React.memo(ExitPublicationAlertView);
