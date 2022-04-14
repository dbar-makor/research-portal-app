import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { RedFilledButton, FilledButton } from '../../../../styles/MainStyles';

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
					<Typography className={classes.deleteTitle}>Unsaved Publication</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteText}>
						You are about to leave the page without saving your publication.
						<br />
						Are you sure you want to discard your changes?
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container className={classes.alertButtonsWrapper} justifyContent="space-between">
						<Grid item>
							<RedFilledButton className={classes.discardButton} onClick={props.handleDiscard}>
								Discard
							</RedFilledButton>
						</Grid>
						<Grid item>
							<FilledButton className={classes.draftButton} onClick={props.handleSave}>
								Save As Draft
							</FilledButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

ExitPublicationAlertView.displayName = 'ExitPublicationAlertView';
ExitPublicationAlertView.defaultProps = {};

export default React.memo(ExitPublicationAlertView);
