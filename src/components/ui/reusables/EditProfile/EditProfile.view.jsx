import React from 'react';
import { Grid, Typography, Avatar, Divider } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import { FilledButton, StyledTextField } from '../../../../styles/MainStyles';
import ChangePassword from '../ChangePassword/ChangePassword';
import PhoneInput from '../PhoneInput/PhoneInput';
import CategoriesAutoComplete from '../CategoriesAutoComplete/CategoriesAutoComplete';
import { validateUserInformation } from '../../../../utils/helpers/validationFunctions';
import { ReactComponent as UploadIcon } from '../../../../assets/icons/smallUpload.svg';
//import AvatarEditor from 'react-avatar-editor';
import useStyles from './EditProfile.style';

const EditProfileView = (props) => {
	const classes = useStyles();

	return (
		<Grid container direction="column" className={classes.editWrapper}>
			<Grid item className={classes.upperSection}>
				<Typography variant="h6">Personal Information</Typography>
				<Grid item container alignItems="center" className={classes.avatarWrapper}>
					<Grid item>
						<Avatar
							className={classes.avatar}
							src={
								props.avatar ? props.avatar : '../../../../assets/icons/DefaultProfilePic.svg'
							}
						/>
					</Grid>
					<Grid
						item
						container
						justifyContent="center"
						alignItems="center"
						className={classes.editIconWrapper}
					>
						{props.avatar ? (
							<CreateIcon className={classes.editIcon} />
						) : (
							<UploadIcon className={classes.uploadIcon} />
						)}
					</Grid>
					{!props.avatar && (
						<Grid item container direction="column" className={classes.instructionsBox}>
							<Typography className={classes.avatarInstructions}> Must be below: </Typography>
							<Typography className={classes.avatarInstructions}>
								170
								<span>X</span>
								170 px
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			<Grid
				container
				item
				justifyContent="space-between"
				className={classes.fieldsWrapper}
				spacing={1}
				xs={12}
			>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.name || ''}
						variant="outlined"
						fullWidth
						label="Full Name"
						error={!!props.errors.name}
						helperText={props.errors.name}
						onChange={(e) => {
							props.handleUserInformationChange('name', e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.email || ''}
						variant="outlined"
						fullWidth
						label="Email"
						error={!!props.errors.email}
						helperText={props.errors.email}
						onChange={(e) => {
							props.handleUserInformationChange('email', e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<PhoneInput
						errors={props.errors}
						setErrors={props.setErrors}
						validationResult={props.validationResult}
						setValidationResult={props.setValidationResult}
						handleUserInformationChange={props.handleUserInformationChange}
						setUserInformation={props.setUserInformation}
						userInformation={props.userInformation}
						dialingCodeInputValue={props.dialingCodeInputValue}
						setDialingCodeInputValue={props.setDialingCodeInputValue}
						adornment={props.adornment}
						setAdornment={props.setAdornment}
					/>
				</Grid>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.position || ''}
						variant="outlined"
						fullWidth
						label="Position"
						error={!!props.errors.position}
						helperText={props.errors.position}
						onChange={(e) => {
							props.handleUserInformationChange('position', e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.username || ''}
						variant="outlined"
						fullWidth
						label="Username"
						error={!!props.errors.username}
						helperText={props.errors.username}
						onChange={(e) => {
							props.handleUserInformationChange('username', e.target.value);
						}}
					/>
				</Grid>
				<Grid item xs={9} md={6} xl={4} className={classes.fieldWrapper}>
					<KeyboardDatePicker
						className={classes.birthdayPicker}
						autoOk
						orientation="portrait"
						disableToolbar
						variant="inline"
						inputVariant="outlined"
						format="dd/MM/yyyy"
						placeholder="Date"
						label="Birthday"
						value={props.userInformation.birthday || new Date()}
						error={!!props.errors.birthday}
						helperText={props.errors.birthday}
						InputAdornmentProps={{ position: 'end' }}
						keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
						onChange={(date) => {
							props.handleUserInformationChange('birthday', date);
						}}
					/>
				</Grid>
				<Grid item xs={10} xl={8} className={classes.autoComplete}>
					<CategoriesAutoComplete
						mode="edit"
						className={classes.autoCompleteField}
						formObject={props.localCats}
						setFormObject={props.setLocalCats}
						handler={props.handleCatsChange}
						error={props.errors.categories}
						errors={props.errors}
						setErrors={props.setErrors}
						validationResult={props.validationResult}
						setValidationResult={props.setValidationResult}
						validationFunction={validateUserInformation}
					/>
				</Grid>
				<Grid item xs={12}>
					<Divider style={{ width: '100%' }} />
				</Grid>
				<Grid className={classes.lowerSection}>
					<Grid
						item
						className={props.chosenModal ? classes.chosenRoute : classes.notChosen}
						onClick={() => props.handleOpenModal('modal')}
					>
						<Grid container alignItems="center">
							<Grid item>
								<Typography className={classes.link}>
									Change Password
									<ArrowForwardIosOutlinedIcon className={classes.arrowIcon} />
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.saveButton}>
						<Grid container justifyContent="flex-end">
							<FilledButton disabled={!props.validationResult} onClick={props.handleFormSubmit}>
								Save
							</FilledButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<ChangePassword chosenModal={props.chosenModal} handleCloseModal={props.handleCloseModal} />
		</Grid>
	);
};

EditProfileView.displayName = 'EditProfileView';
EditProfileView.defaultProps = {};

export default React.memo(EditProfileView);
