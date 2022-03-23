import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { StyledTextField } from '../../../../styles/MainStyles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import NumberInputUnit from '../../reusables/NumberInputUnit/NumberInputUnit';
import NumberFormatCustom from '../../../layout/NumberFormatCustom/NumberFormatCustom';
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
					></StyledTextField>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.email}
						variant="outlined"
						fullWidth
						label="Email"
					></StyledTextField>
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
					></NumberInputUnit>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.position}
						variant="outlined"
						fullWidth
						label="Position"
					></StyledTextField>
				</Grid>
				<Grid item>
					<StyledTextField
						className={classes.textField}
						value={props.userInformation.username}
						variant="outlined"
						fullWidth
						label="Username"
					></StyledTextField>
				</Grid>
				<Grid item>
					<KeyboardDatePicker
						className={classes.birthdayPicker}
						autoOk
						orientation="portrait"
						disableToolbar
						variant="inline"
						inputVariant="outlined"
						format={'dd/MM/yyyy'}
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
			<Grid item></Grid>
		</Grid>
	);
};

EditProfileView.displayName = 'EditProfileView';
EditProfileView.defaultProps = {};

export default React.memo(EditProfileView);
