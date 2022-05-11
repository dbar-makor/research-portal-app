import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	eventsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '12px 12px 12px 0',
		'marginTop': '20px',
		'marginLeft': '-10px',
		'maxHeight': 'calc(540px - 3vw)',
		'@media (max-width: 1700px)': {
			maxHeight: 'calc(540px - 2vw)',
		},
		'@media (max-width: 1450px)': {
			maxHeight: 'calc(540px - 1vw)',
		},
		'@media (max-width: 1400px)': {
			maxHeight: 'calc(570px - 1vw)',
		},
		'@media (max-width: 1150px)': {
			maxHeight: 'calc(590px - 1vw)',
		},
		'overflowY': 'auto',
		'&::-webkit-scrollbar-track': {
			borderRadius: '10px',
			backgroundColor: '#F3F4F8',
		},
		'&::-webkit-scrollbar': {
			borderRadius: '10px',
			maxWidth: '7px',
			zIndex: 2,
			backgroundColor: '#F5F5F5',
		},
		'&::-webkit-scrollbar-thumb': {
			borderRadius: '10px',
			backgroundColor: '#D5DBE7',
		},
	},
	eventsInnerWrapper: (props) => ({
		'display': 'flex',
		'position': 'relative',
		'justifyContent': 'center',
		'height': 45,
		'&:not(:last-child)': {
			marginBottom: '15px',
		},
		'&:hover': {
			cursor: props.isAuthenticated ? 'pointer' : 'default',
		},
		'&:hover > div:first-of-type': {
			width: props.isAuthenticated ? '98%' : 0,
			height: 35,
			position: props.isAuthenticated ? 'absolute' : 'static',
			top: 0,
			left: 0,
		},
		'&:hover > div:nth-of-type(2)': {
			'display': props.isAuthenticated ? 'none' : 'flex',
			'width': props.isAuthenticated ? 0 : '100%',
			'& div': {
				display: props.isAuthenticated ? 'none' : 'flex',
			},
		},
		'&:hover > div:first-of-type svg': {
			display: props.isAuthenticated ? 'inline' : 'none',
		},
		'&:hover div span': {
			display: props.isAuthenticated ? 'inline' : 'none',
		},
	}),
	eventsLabel: {
		padding: '5px',
		marginRight: '10px',
		borderRadius: '0 2px 2px 0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 0,
		transition: 'width 0.5s, display 0.5s',
	},
	markboxWrapper: {
		display: 'flex',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	markBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	bookmarkIcon: {
		marginRight: 5,
		paddingTop: 3,
		display: 'none',
		fill: '#fff',
		fontSize: 16,
	},
	addSpan: {
		color: '#fff',
		fontSize: 16,
		display: 'none',
	},
	eventsContentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		transition: 'width 0.5s',
		maxHeight: 50,
		overflowY: 'hidden',
		overflowX: 'hidden',
	},
	eventsInnerContentWrapper: {
		'display': 'flex',
		'flexDirection': 'row',
		'justifyContent': 'space-between',
		'&:not(:last-child)': {
			marginBottom: '4px',
			marginTop: 3,
		},
		'&:last-child': {
			marginTop: -6,
		},
	},
	eventsHeader: {
		color: '#0F0F0F',
		fontWeight: 'bold',
		fontSize: '.9rem',
		display: 'flex',
		alignItems: 'center',
	},
	miniBookmark: {
		fill: '#B8C3D8',
		fontSize: 15,
		paddingTop: 4,
		marginRight: 5,
	},
}));

export default useStyles;
