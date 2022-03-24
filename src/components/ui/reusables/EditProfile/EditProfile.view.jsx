import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import { StyledTextField } from '../../../../styles/MainStyles';
import NumberInputUnit from '../NumberInputUnit/NumberInputUnit';
import NumberFormatCustom from '../../../layout/NumberFormatCustom/NumberFormatCustom';
import ChangePassword from '../ChangePassword/ChangePassword';
//import CategoriesAutoComplete from '../../reusables/CategoriesAutoComplete/CategoriesAutoComplete';

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
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.name}
						variant="outlined"
						fullWidth
						label="Full Name"
					/>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.email}
						variant="outlined"
						fullWidth
						label="Email"
					/>
				</Grid>
				<Grid item>
					<NumberInputUnit
						className={classes.textField}
						value={props.fullName}
						variant="outlined"
						fullWidth
						label="Full Name"
						InputProps={{
							inputComponent: NumberFormatCustom,
							inputProps: {
								decimalNo: 0,
								minValue: 0,
							},
						}}
					/>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.position}
						variant="outlined"
						fullWidth
						label="Position"
					/>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.username}
						variant="outlined"
						fullWidth
						label="Username"
					/>
				</Grid>
				<Grid item>
					<KeyboardDatePicker
						className={classes.birthdayPicker}
						autoOk
						orientation="portrait"
						disableToolbar
						variant="inline"
						inputVariant="outlined"
						format="dd/MM/yyyy"
						placeholder="Date"
						value="01/01/2000"
						InputAdornmentProps={{ position: 'end' }}
						keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
					/>
				</Grid>
				<Grid item>
					{/* <CategoriesAutoComplete
						// formObject={props.localCats}
						// setFormObject={props.setLocalCats}
						// handler={props.handleCatsChange}
						// error={props.errors.categories}
						// errors={props.errors}
						// setErrors={props.setErrors}
						// validationResult={props.validationResult}
						// setValidationResult={props.setValidationResult}
					/> */}
				</Grid>
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
			<ChangePassword chosenModal={props.chosenModal} handleCloseModal={props.handleCloseModal} />
		</Grid>
	);
};

EditProfileView.displayName = 'EditProfileView';
EditProfileView.defaultProps = {};

export default React.memo(EditProfileView);
