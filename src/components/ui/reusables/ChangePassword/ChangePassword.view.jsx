import React from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
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
						<CloseIcon className={classes.closeIcon} onClick={props.handleReset} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.title}>Change Password</Typography>
				</Grid>
				<Grid item xs={12} container spacing={2} className={classes.contentWrapper}>
					<Grid item xs={12} lg={6} container direction="column" className={classes.fieldsWrapper}>
						<StyledTextField
							value={props.localForm['old_password']}
							variant="outlined"
							fullWidth
							label="Old Password"
							className={classes.textField}
							error={!!props.errors.old_password}
							helperText={props.errors.old_password}
							onChange={(e) => props.handleFormChange(e.target.value, 'old_password', 'old')}
						/>
						<StyledTextField
							value={props.localForm['new_password']}
							variant="outlined"
							fullWidth
							label="New Password"
							className={classes.textField}
							error={!!props.errors.new_password}
							helperText={props.errors.new_password}
							onChange={(e) => props.handleFormChange(e.target.value, 'new_password', 'new')}
						/>
						<StyledTextField
							value={props.localForm['new_password_confirm']}
							variant="outlined"
							fullWidth
							label="Confirm Password"
							className={classes.textField}
							error={!!props.errors.new_password_confirm}
							helperText={props.errors.new_password_confirm}
							onChange={(e) =>
								props.handleFormChange(e.target.value, 'new_password_confirm', 'confirm')
							}
						/>
					</Grid>
					<Grid item xs={12} lg={6}>
						<Typography> Contains at least:</Typography>
						<Grid container className={classes.rulesBox}>
							<ul>
								<li className={classes.rule}>
									<Typography className={classes.ruleContent}>
										8 characters
										{props.passwordRules.length ? (
											<DoneIcon fontSize="small" className={classes.ruleMet} />
										) : null}
									</Typography>
								</li>
								<li className={classes.rule}>
									<Typography className={classes.ruleContent}>
										1 Uppercase alpha character(A,B, ...Z)
										{props.passwordRules.uppercase ? (
											<DoneIcon fontSize="small" className={classes.ruleMet} />
										) : null}
									</Typography>
								</li>
								<li className={classes.rule}>
									<Typography className={classes.ruleContent}>
										1 Lowercase alpha character(a,b, ...z)
										{props.passwordRules.lowercase ? (
											<DoneIcon fontSize="small" className={classes.ruleMet} />
										) : null}
									</Typography>
								</li>
								<li className={classes.rule}>
									<Typography className={classes.ruleContent}>
										1 number (1,2,3,4,5,6,7,8,9,0)
										{props.passwordRules.number ? (
											<DoneIcon fontSize="small" className={classes.ruleMet} />
										) : null}
									</Typography>
								</li>
								<li className={classes.rule}>
									<Typography className={classes.ruleContent}>
										1 Non-alphanumeric ASCII character !@#$%^& *.:;~ &#39; `&#34; */\+?-
										{/* eslint-disable-next-line */}
										_|=()[] {} &#60; &#62;
										{props.passwordRules.other ? (
											<DoneIcon fontSize="small" className={classes.ruleMet} />
										) : null}
									</Typography>
								</li>
							</ul>
						</Grid>
					</Grid>
					<Grid item xs={6} />
				</Grid>
				<Grid item xs={12} className={classes.buttonBox}>
					<Grid container justifyContent="center">
						<FilledButton
							disabled={
								!props.validationResult ||
								!Object.values(props.passwordRules).every((rule) => rule === true)
							}
							onClick={props.handleFormSubmit}
						>
							Done
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

ChangePasswordView.displayName = 'ChangePasswordView';
ChangePasswordView.defaultProps = {};

export default React.memo(ChangePasswordView);
