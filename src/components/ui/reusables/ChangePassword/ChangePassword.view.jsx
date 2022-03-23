import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
//import { useStyles } from '../../../../styles/InfoStyles';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import { FilledButton, StyledTextField } from '../../../../styles/MainStyles';

import useStyles from './ChangePassword.style';

const ChangePasswordView = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.chosenModal}
			classes={{ paper: classes.alertModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
			onClose={props.handleCloseModal}
		>
			<Grid container>
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon className={classes.closeIcon} onClick={props.handleClose} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.title}>Change Password</Typography>
				</Grid>
				{/* main content */}
				<Grid item xs={12} container>
					<Grid item xs={6}>
						<StyledTextField
							value={props.oldPass}
							variant="outlined"
							fullWidth
							placeholder="Search"
							onChange={(e) => props.setInvoiceId(e.target.value)}
							onKeyDown={(e) => props.hendlerForInvoiceId(e, 'INVOICE_ID')}
						/>
						<StyledTextField />
						<StyledTextField />
					</Grid>
					<Grid item xs={6} />
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center">
						<FilledButton onClick={() => props.deleteItem(props.itemId)}>Delete</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

ChangePasswordView.displayName = 'ChangePasswordView';
ChangePasswordView.defaultProps = {};

export default React.memo(ChangePasswordView);
