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

//import AvatarEditor from 'react-avatar-editor';
import useStyles from './EditProfile.style';

const EditProfileView = (props) => {
	const classes = useStyles();

	return (
		<Grid container direction="column" className={classes.editWrapper}>
			<Grid item>
				<Typography variant="h6">Personal Information</Typography>
				<Grid container className={classes.avatarWrapper}>
					<Avatar className={classes.avatar} src={props.avatar} />
					<Grid
						item
						container
						justifyContent="center"
						alignItems="center"
						className={classes.editIconWrapper}
					>
						<CreateIcon className={classes.editIcon} />
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				className={classes.fieldsWrapper}
				alignItems="center"
				justifyContent="space-evenly"
			>
				<Grid item xs={4}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.name}
						variant="outlined"
						fullWidth
						label="Full Name"
					/>
				</Grid>
				<Grid item xs={4}>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.email}
						variant="outlined"
						fullWidth
						label="Email"
					/>
				</Grid>
				<Grid item xs={4}>
					<PhoneInput />
				</Grid>
				<Grid container item xs={12} className={classes.padding}>
					<Grid item xs={4}>
						<StyledTextField
							className={classes.textField}
							value={props.userInformation.position}
							variant="outlined"
							fullWidth
							label="Position"
						/>
					</Grid>
					<Grid item xs={4}>
						<StyledTextField
							className={classes.textField}
							value={props.userInformation.username}
							variant="outlined"
							fullWidth
							label="Username"
						/>
					</Grid>
					<Grid item xs={4}>
						<KeyboardDatePicker
							className={classes.birthdayPicker}
							autoOk
							orientation="portrait"
							disableToolbar
							variant="inline"
							inputVariant="outlined"
							format="dd/MM/yyyy"
							placeholder="Date"
							value={props.userInformation.birthday}
							InputAdornmentProps={{ position: 'end' }}
							keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
						/>
					</Grid>
				</Grid>
				<Grid item xs={6} className={`${classes.padding} ${classes.autoComplete}`}>
					<CategoriesAutoComplete
						formObject={props.localCats}
						setFormObject={props.setLocalCats}
						handler={props.handleCatsChange}
						error={props.errors.categories}
						errors={props.errors}
						setErrors={props.setErrors}
						validationResult={props.validationResult}
						setValidationResult={props.setValidationResult}
					/>
				</Grid>
				<Grid item xs={12} className={classes.padding}>
					<Divider style={{ width: '100%' }} />
				</Grid>
				<Grid
					item
					xs={12}
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
				<Grid item xs={12} className={classes.saveButton}>
					<Grid container justifyContent="flex-end">
						<FilledButton
							disabled={false}
							//onClick={props.handleFormSubmit}
						>
							Save
						</FilledButton>
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
