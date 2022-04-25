import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	saveButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		paddingTop: '50px',
	},
	autoComplete: {},
	autoCompleteField: {
		width: '111%',
		minWidth: '111%',
	},
	editWrapper: {
		paddingTop: '30px',
		paddingLeft: '10px',
		paddingRight: '10px',
		//height: '100%',
		flexWrap: 'nowrap',
		[theme.breakpoints.down('sm')]: {
			margin: '0 auto',
			width: '90%',
		},
	},
	upperSection: {
		marginLeft: 15,
	},
	lowerSection: {
		minHeight: 70,
	},
	avatar: {
		'height': '96px',
		'width': '96px',
		'backgroundColor': '#E1EBFC',
		//fill: '#1C67FF',
		'& svg': {
			fill: '#1C67FF',
		},
	},
	avatarWrapper: {
		marginTop: '10px',
		position: 'relative',
		// width: 'fit-content',
		flexWrap: 'nowrap',
	},
	editIconWrapper: {
		width: '21px',
		height: '21px',
		border: ' 1px solid transparent',
		borderRadius: '50%',
		backgroundColor: '#fff',
		boxShadow: '0px 0px 0px 2px #A5AFC233',
		position: 'absolute',
		bottom: '0px',
		left: '70px',
		zIndex: 2,
	},
	editIcon: {
		width: '15px',
		height: '15px',
		fill: '#1C67FF',
	},
	uploadIcon: {
		transform: 'scale(0.85)',
	},
	instructionsBox: {
		fontSize: 12,
		marginLeft: 16,
	},
	avatarInstructions: {
		'color': '#868DA2',
		'& span': {
			fontSize: 10,
			verticalAlign: 2,
		},
	},
	fieldsWrapper: {
		marginTop: '10px',
		//marginLeft: '-15px',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: '50%',
		[theme.breakpoints.down('sm')]: {},
	},
	fieldWrapper: {
		marginBottom: 10,
	},
	textField: {
		// 'width': '11vw',
		'minWidth': '200px',
		'& .MuiInputLabel-outlined': {
			transform: 'translate(14px, -6px) scale(0.75) !important',
			backgroundColor: '#fff',
		},
		'& .MuiInputLabel-shrink': {
			transform: 'translate(14px, -6px) scale(0.75) !important',
		},
	},
	birthdayPicker: {
		'minWidth': '200px',
		'& .MuiOutlinedInput-root': {
			'borderRadius': '8px',
			'& fieldset': {
				borderColor: '#A5AFC233',
			},
			'&:hover fieldset': {
				border: '1px solid #A5AFC233',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #A5AFC233',
			},
		},
		'& .MuiInputBase-root': {
			height: '42px',
			width: '210px',
		},
	},
	calendarIcon: {
		'& g': {
			'& path': {
				stroke: '#1C67FF',
			},
		},
	},
	chosenRoute: {
		marginTop: 10,
		color: '#1C67FF',
		backgroundColor: '#e0ebfc',
		cursor: 'pointer',
	},
	notChosen: {
		marginTop: 10,
		color: '#000000',
		backgroundColor: 'none',
		cursor: 'pointer',
	},
	link: {
		position: 'relative',
		color: '#1C67FF',
		textDecoration: 'underline',
	},
	arrowIcon: {
		fontSize: '14px',
		paddingTop: '5px',
		position: 'absolute',
		fill: '#1C67FF',
	},
	textFieldStyle: {
		'width': '50%',
		'borderColor': '#A5AFC233',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			fontFamily: 'inter',
			fontSize: '.MuiInputBase-input',
			borderRadius: '8px',
			color: '#0F0F0F',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			color: '#868DA2',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: 2,
		},
		'& .makeStyles-textFieldStyle-453 .MuiInputBase-input': {
			color: 'red',
		},
		'& .MuiOutlinedInput-adornedStart': {
			padding: 0,
		},
	},
}));

export default useStyles;
