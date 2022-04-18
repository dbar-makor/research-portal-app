import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	publishStyle: {
		'backgroundColor': '#1C67FF',
		'color': '#FFF',
		'borderRadius': '21px',
		'textTransform': 'capitalize',
		'width': '95px',
		'minWidth': '95px',
		'height': '32px',
		'fontSize': '16px',
		'marginTop': 10,
		'marginRight': 4,
		'zIndex': 10,
		'&:hover': {
			backgroundColor: '#0044CD',
			boxShadow: '0px 6px 10px #00185829',
			transition: '.3s',
		},
		'&.Mui-disabled': {
			backgroundColor: '#ACB1BF',
			color: '#868DA2',
		},
	},
	cardWrapper: {
		minWidth: 250,
		maxWidth: 350,
		marginRight: 10,
		marginBottom: 30,
	},
	card: {
		// flexDirection: "column",
		// maxWidth: 350,
		//minWidth: 280,
		height: 370,
		position: 'relative',
	},
	upperHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 200,
		borderRadius: '8px 8px 0 0',
		position: 'relative',
	},
	visibleIcon: {
		marginTop: 3,
		marginRight: 4,
	},
	viewsBox: {
		'backgroundColor': '#fff',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'space-evenly',
		'padding': '3px 14px 4px 14px',
		'height': 26,
		'marginTop': 20,
		'marginRight': 20,
		'borderRadius': 16,
		'fontSize': 20,
		'zIndex': 3,
		'color': '#1C67FF',
		'& svg': {
			height: 22,
		},
	},
	typeIndicator: {
		backgroundColor: '#fff',
		borderRadius: '50%',
		// alignSelf: "flex-end",
		position: 'absolute',
		left: 10,
		bottom: 10,
		// display: "flex",

		// width: 20,
		// height: 20,
		// padding:
	},
	typeIcon: {
		padding: '8px 10px 5px 10px',
	},
	draftBox: {
		color: '#fff',
		backgroundColor: '#1C67FF',
		padding: '5px 14px 5px 14px',
		fontSize: 16,
	},

	lowerHalf: {
		display: 'flex',
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 180,
		padding: '12px 25px 8px 16px ',
		borderLeft: '2px solid #ECEEF2',
		borderRight: '2px solid #ECEEF2',
		borderBottom: '2px solid #ECEEF2',
		borderRadius: '0 0 8px 8px',
		overflow: 'hidden',
	},
	contentContainer: {
		maxHeight: 108,
		overflowY: 'hidden',
	},
	pubTitle: {
		marginBottom: 16,
		fontWeight: '600',
		fontSize: 18,
		color: '#3E3E3E',
		[theme.breakpoints.down('lg')]: {
			fontSize: 16,
		},
	},
	pubDescription: {
		fontSize: '.9rem',
		color: '#3E3E3E',
	},
	chipContainer: {
		marginTop: '10px',
	},
	chipItem: {
		marginBottom: '5px',
		marginRight: '3px',
	},
	chip: {
		backgroundColor: '#EDEFF3',
		border: 'none',
		width: '6vw',
		height: '3vh',
		fontWeight: 500,
	},
	roundedChip: {
		'borderRadius': '50%',
		'border': 'none',
		'backgroundColor': '#EDEFF3',
		'width': '30px',
		'height': '30px',
		'fontWeight': 500,
		'& .MuiChip-label': {
			textOverflow: 'unset',
			paddingLeft: '5px',
		},
	},
	backdrop: {
		'zIndex': '2',
		'width': 'inherit',
		'height': 200,
		'position': 'absolute',
		'opacity': 0,
		'transition': 'opacity 0.7s',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'top': 0,
		'left': 0,
		'borderRadius': '8px 8px 0 0',

		'&:hover': {
			'opacity': 1,
			'backgroundColor': 'rgba(0,0,0,0.2)',
			'-webkit-backdrop-filter': 'blur(7px)',
			'backdropFilter': 'blur(7px)',
		},
	},
	binBtn: {
		'backgroundColor': '#fff',
		'marginRight': 12,
		'padding': '9px 11px',
		'& path': {
			fill: 'red',
		},
		'&:hover': {
			'backgroundColor': 'red',
			'& path': {
				fill: '#fff',
			},
		},
	},
	editBtn: {
		'backgroundColor': '#fff',
		'& path': {
			fill: '#000',
		},
		'&:hover': {
			'backgroundColor': '#000',
			'& path': {
				fill: '#fff',
			},
		},
	},
}));

export default useStyles;
