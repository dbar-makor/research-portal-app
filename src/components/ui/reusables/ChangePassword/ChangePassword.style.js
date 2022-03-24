import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	alertModalPaper: {
		borderRadius: '8px',
		width: '40vw',
		maxWidth: '40vw',
		minHeight: '23vh',
		padding: '16px',
	},
	modalBackDrop: {
		backdropFilter: 'blur(2px)',
		backgroundColor: '#00001e25',
	},
	closeIcon: {
		'cursor': 'pointer',
	},
	title: {
		textTransform: 'capitalize',
		color: '#868DA2',
		fontWeight: 600,
		fontSize: '24px',
		textAlign: 'center',
		marginBottom: '22px',
	},
	contentWrapper:{
		flexWrap: 'wrap'
	},
	fieldsWrapper: {
		justifyContent: 'space-evenly',
		marginTop: '5%'
	},
	textField: {
		minHeight: 65,
		'& .MuiInputLabel-outlined': {
			transform: 'translate(14px, 12px) scale(1) !important',
		},
		'& .MuiInputLabel-shrink': {
			transform: 'translate(14px, -6px) scale(0.75) !important',
			color: '#868DA2'
		},
	},
	rulesBox: {
		backgroundColor: '#EDEFF3',
		borderRadius: 4,
		padding: 12,
	},
	rule:{
		width: '100%',
		minHeight: 35,
		paddingBottom:6
	},
	ruleMet:{
		stroke: '#1C67FF'
	},
	ruleContent:{
		width: '95%',
		display:'inline-flex',
		justifyContent: 'space-between',
		lineHeight: 1.3
	},
	buttonBox:{
		marginTop: '10%',
		marginBottom: '2%'
	}
});

export default useStyles;
