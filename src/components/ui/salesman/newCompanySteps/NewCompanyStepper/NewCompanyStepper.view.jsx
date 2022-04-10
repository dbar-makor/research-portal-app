import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import StepperConnector from '../StepperConnector';
import StepperIcons from '../StepperIcons/StepperIcons';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/closeIcon.svg';
import { FilledButton, OutlinedButton } from '../../../../../styles/MainStyles';
import InfoStep from '../InfoStep/InfoStep';
import MembersStep from '../MembersStep/MembersStep';
import SubHeaderModal from '../../../reusables/SubHeaderModal/SubHeaderModal';
import useStyles from './NewCompanyStepper.style';

const NewCompanyStepperView = (props) => {
	const classes = useStyles();
	const utils = useSelector((state) => state.utils.utils);

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<InfoStep
						company={props.company}
						setCompany={props.setCompany}
						handleCompany={props.handleCompany}
						classes={classes}
						errors={props.errors1}
						setErrors={props.setErrors1}
						validationResult={props.validationResult1}
						setValidationResult={props.setValidationResult1}
						setUploadedImage={props.setUploadedImage}
						uploadedImage={props.uploadedImage}
						inputValue={props.inputValue}
						setInputValue={props.setInputValue}
					/>
				);
			case 1:
				return (
					<MembersStep
						company={props.company}
						setCompany={props.setCompany}
						currentMember={props.currentMember}
						setCurrentMember={props.setCurrentMember}
						initStateMember={props.initStateMember}
						handleSubmit={props.handleSubmit}
						classes={classes}
						errors={props.errors2}
						setErrors={props.setErrors2}
						validationResult={props.validationResult2}
						setValidationResult={props.setValidationResult2}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return utils ? (
		<Dialog
			className={classes.dialogBox}
			open={props.open}
			classes={{ container: classes.container, paper: classes.contractModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
			onClose={props.handleClose}
		>
			<Grid container justifyContent="center" className={classes.dialogContainer}>
				<Grid item xs={10}>
					<Grid container>
						<Grid style={{ marginRight: '10px' }} item xs={12}>
							<Grid container justifyContent="flex-end">
								<CloseIcon className={classes.closeIcon} onClick={props.handleClose} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<SubHeaderModal title="New Company" />
								<Grid item xs={4} />
								<Grid container className={classes.stepperGroup}>
									<Stepper
										alternativeLabel
										activeStep={props.activeStep}
										connector={<StepperConnector />}
									>
										<Step>
											<StepLabel
												StepIconComponent={StepperIcons}
												onClick={props.activeStep === 1 ? props.handleBack : () => {}}
											>
												{props.steps[0]}
											</StepLabel>
										</Step>
										<Step>
											<StepLabel
												StepIconComponent={StepperIcons}
												onClick={
													props.activeStep === 0 && props.validationResult1
														? props.handleNext
														: () => {}
												}
											>
												{props.steps[1]}
											</StepLabel>
										</Step>
									</Stepper>
									<Grid container className={classes.instructions}>
										{getStepContent(props.activeStep)}
									</Grid>
									<Grid container className={classes.btnRow}>
										{props.activeStep === 0 ? (
											<div />
										) : (
											<OutlinedButton
												className={classes.buttonBack}
												onClick={props.handleBack}
											>
												Back
											</OutlinedButton>
										)}
										{props.activeStep === 0 ? (
											<FilledButton
												className={classes.buttonNext}
												disabled={!props.validationResult1}
												onClick={props.handleNext}
											>
												Next
											</FilledButton>
										) : (
											<FilledButton
												className={classes.buttonNext}
												disabled={
													!props.validationResult2 ||
													props.company.members.length < 1
												}
												onClick={props.handleSubmit}
											>
												Create
											</FilledButton>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	) : (
		<Typography>Loading...</Typography>
	);
};

NewCompanyStepperView.displayName = 'NewCompanyStepperView';
NewCompanyStepperView.defaultProps = {};

export default React.memo(NewCompanyStepperView);
