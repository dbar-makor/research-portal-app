import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { RedFilledButton } from '../../../../styles/MainStyles';
import { useStyles } from '../../../../styles/InfoStyles';

const MessageAlertView = (props) => {
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
					<Typography className={classes.deleteTitle}>{props.title}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.deleteText}>{`${props.text} ?`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<RedFilledButton onClick={() => props.handleAction()}>
							{props.actionName}
						</RedFilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

MessageAlertView.displayName = 'MessageAlertView';
MessageAlertView.defaultProps = {};

export default React.memo(MessageAlertView);
