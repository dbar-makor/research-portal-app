import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	input: {
		marginBottom: '48px',
		display: 'none',
		minHeight: 70,
	},
	pdfbtn: {
		'fontSize': '1rem',
		'fontWeight': '500',
		'color': '#868DA2',
		'padding': '5px 5px 4px 5px',
		'border': '2px solid #A5AFC233',
		'borderRadius': 8,
		'width': '100%',
		'justifyContent': 'flex-start',
		'textTransform': 'capitalize',
		'&:hover': {
			backgroundColor: '#fff',
		},
	},
	clearIcon: {
		fontSize: '15px',
		fill: '#868DA2',
	},
	arrowStyle: {
		'padding': 1,
		'& path': {
			fill: '#868DA2',
		},
		'& .makeStyles-arrowStyle-240': {
			padding: 5,
		},
	},
	arrow2Style: {
		'& path': {
			'fill': '#1C67FF',
			'cursor': 'pointer',
			'& .disabled': {
				fill: '#868DA2',
			},
		},
		'& .makeStyles-iconButton-672': {
			padding: 2,
		},
	},
	customError: {
		color: 'red',
		marginLeft: 14,
	},
}));

export default useStyles;
