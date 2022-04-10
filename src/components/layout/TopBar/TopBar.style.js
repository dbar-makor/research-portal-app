import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	'barWrapper': {
		backgroundColor: '#FEFEFE',
		minHeight: '6vh',
		height: '6vh',
	},
	'headerContainer': {
		position: 'sticky',
		top: 0,
		backgroundColor: ' rgba(0, 0, 0, 1)',
		zIndex: 1200,
	},
	'header': {
		backgroundColor: '#FEFEFE',
		flexDirection: 'row',
		boxShadow: 'none',
		minHeight: '6vh',
		height: '6vh',
	},
	'divider': {
		backgroundColor: '#353535',
		height: 2,
		width: '100%',
	},
	'title': {
		flexGrow: 1,
		color: '##fff',
		fontSize: 16,
	},
	'link': {
		'textDecoration': 'none',
		'color': '#fff',
		'& svg': {
			fill: '#0F0F0F !important',
		},
	},
	'subTitle': {
		color: '#000000',
		fontSize: '20px',
	},
	'styledLinks': {
		fontSize: 16,
		textDecoration: 'none',
		color: '#0F0F0F',
	},
	'label': {
		top: -10,
		color: '#686d7d',
	},
	'gridSpacing': {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(10),
	},
	'formControl': {
		display: 'block',
	},
	'& .MuiMenu-paper': {
		transform: 'translate(0px, 100%) !important',
	},
	'selectBox': {
		marginTop: 6,
		minWidth: 140,
		maxWidth: 160,
	},
	'select': {
		'marginBottom': '15px',
		'& svg': {
			stroke: '#727789',
			fill: 'transparent',
			paddingTop: '3px',
		},
		// '& select': {
		// 	'color': '#fff',
		// 	'paddingTop': 12,
		// 	transform: 'translate(0px, 80%)',
		// 	'&::placeholder': {
		// 		color: '#fff',
		// 	},
		// },
		// '& option': {
		// 	paddingBottom: 8,
		// 	paddingTop: 8,
		// 	color: '#000',
		// },
		'& .MuiSelect-nativeInput': {
			opacity: 1,
			color: '#ffff',
			fontSize: '16px',
			backgroundColor: '#000',
			border: 'none',
		},
		'& .MuiInput-underline:after': {
			border: 'none',
		},
	},
	'search': {
		'width': '349px',
		'& .MuiFilledInput-root': {
			backgroundColor: '#EDF2FB',
			borderRadius: '5px',
		},
		'& .MuiFilledInput-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
		'& .MuiFilledInput-underline:before': {
			border: 'none',
		},
		'& .MuiFilledInput-underline:after': {
			border: 'none',
		},
		'& svg': {
			stroke: '#FFF',
		},
		'& .MuiInputBase-input': {
			'&::placeholder': {
				color: '#868DA2',
				opacity: '100%',
			},
		},
	},
	'searchIcon': {
		'& path': {
			fill: '#1C67FF',
		},
	},
}));

export default useStyles;
