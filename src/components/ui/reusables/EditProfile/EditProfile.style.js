import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	editWrapper: {
		paddingTop: '30px',
		paddingLeft: '15px',
	},
	avatar: {
		height: '96px',
		width: '96px',
	},
	avatarWrapper: {
		marginTop: '10px',
		position: 'relative',
		width: 'fit-content',
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
		right: '0px',
		zIndex: 2,
	},
	editIcon: {
		width: '15px',
		height: '15px',
		fill: '#1C67FF',
	},
	fieldsWrapper: {
		marginTop: '10px',
		marginLeft: '-15px',
		height: '140px',
	},
	textField: {
		'& .MuiInputLabel-outlined': {
			transform: 'translate(14px, -6px) scale(0.75) !important',
		},
		'& .MuiInputLabel-shrink': {
			transform: 'translate(14px, -6px) scale(0.75) !important',
		},
		'width': '260px',
	},
	birthdayPicker: {
		'width': '100%',
		'height': '43px',
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
			width: '250px',
		},
	},
	calendarIcon: {
		'& g': {
			'& path': {
				stroke: '#1C67FF',
			},
		},
	},
}));
export default useStyles;
