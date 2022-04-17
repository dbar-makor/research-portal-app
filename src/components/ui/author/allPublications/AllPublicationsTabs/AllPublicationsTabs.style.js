import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	barWrapper: {
		padding: '10px',
		[theme.breakpoints.down('lg')]: {
			minHeight: 140,
			alignContent: 'space-between',
		},
	},
	rightBarWrapper: {
		[theme.breakpoints.down('md')]: {
			justifyContent: 'flex-start',
		},
	},
	categoriesWrapper: {
		[theme.breakpoints.only('lg')]: {
			marginRight: 20,
		},
	},
	newBtn: {
		'borderRadius': 4,
		'padding': '8px 15px',
		'minWidth': 100,
		'display': 'inline-block',
		'color': '#fff',
		'fontSize': 17,
		'height': 41,
		'& span': {
			display: 'flex',
			justifyContent: 'space-evenly',
		},
	},
	tabs: {
		'minWidth': '30vh',
		'& .MuiTabs-indicator': {
			backgroundColor: '#1C67FF',
		},
	},
	tab: {
		left: '8px',
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	tabPanel: {
		display: 'flex',
		flexWrap: 'wrap',
		width: 'inherit',
	},
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	dialogPaper: {
		width: '30vw',
		height: '50vh',
	},
	dialogBackDrop: {
		backdropFilter: 'blur(2px)',
		backgroundColor: '#00001e25',
	},
	noPublications: {
		color: '#868DA2',
		fontSize: '18px',
		marginTop: '20px',
	},
}));

export default useStyles;
