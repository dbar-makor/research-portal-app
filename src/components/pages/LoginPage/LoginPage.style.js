import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	page: {
		height: '100vh',
	},
	modalContainer: {
		backgroundColor: '#fff',
		minWidth: 300,
		// minHeight: 300,
		height: '535px',
		alignItems: 'center',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
		flexWrap: 'nowrap',
	},
	modalContent: {
		maxHeight: '90%',
		maxWidth: 370,
		flexWrap: 'nowrap',
	},
	upperGroup: {
		flexWrap: 'nowrap',
		height: 'fit-content',
	},
	form: {
		flexWrap: 'nowrap',
		minHeight: 140,
	},
	buttonContainer: { height: 'fit-content', maxHeight: 50 },
	textFieldStyle: {
		'borderColor': '#A5AFC233',
		'width': '100%',
		'& .MuiOutlinedInput-input': {
			padding: '10.6px',
		},
		'& .MuiInputBase-input': {
			// 'fontFamily': 'inter',
			'fontSize': '14px',
			// 'borderRadius': '8px',
			'color': '#000',
			'&::placeholder': {
				color: '#000',
				opacity: 1,
			},
		},
		'& input:-webkit-autofill': {
			transition: 'background-color 5000s ease-in-out 0s',
			backgroundColor: '#fff !important',
		},
		'& input:-webkit-autofill:focus': {
			transition: 'background-color 5000s ease-in-out 0s',
			backgroundColor: '#fff !important'
		},
		'& select:-webkit-autofill': {
			transition: 'background-color 5000s ease-in-out 0s',
			backgroundColor: '#fff !important'
		},
		'& select:-webkit-autofill:focus': {
			transition: 'background-color 5000s ease-in-out 0s',
			backgroundColor: '#fff !important'
		},
		'& textarea:-webkit-autofill': {
			transition: 'background-color 5000s ease-in-out 0s',
			backgroundColor: '#fff !important'
		},

		// '& fieldset': {
		// 	backgroundColor: '#fff',
		// 	color: '#000',
		// },
		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: '#A5AFC233',
		},
		'& .makeStyles-textFieldStyle-3 .MuiInputBase-input': {
			paddingRight: '24px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			padding: 0,
		},
	},
	logIn: {
		'textTransform': 'capitalize',
		'fontSize': '15px',
		'height': '40px',
		'width': '130px',
		'position': 'sticky',
		'top': 0,
		'textAlignLast': 'center',
		'& .MuiButton-root': {
			padding: 0,
		},
		'& .MuiButton-text': {
			padding: 0,
		},
	},
	passwordText: {
		'& .MuiIconButton-root': {
			padding: 0,
		},
	},
	portalTitle: {
		color: '#0F0F0F',
		fontSize: '24px',
		fontWeight: 400,
		fontFamily: 'Inter',
		marginBottom: 5,
	},
	logTitle: {
		color: '#868DA2',
		fontSize: '14px',
		fontFamily: 'inter',
	},
	forgotStyle: {
		textAlign: 'end',
		color: '#0F0F0F',
	},
	linkStyle: {
		color: '#0F0F0F',
		fontFamily: 'inter',
		fontSize: '14px',
	},
	center: {
		textAlignLast: 'center',
	},
	loginBtn: {},
}));

export default useStyles;
