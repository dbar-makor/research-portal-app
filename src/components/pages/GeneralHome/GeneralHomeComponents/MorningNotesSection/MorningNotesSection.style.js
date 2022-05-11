import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	morningNotesScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'minHeight': '21vh',
		'maxHeight': '21vh',
		'marginTop': '2px',
		'overflow': 'hidden',
		'overflowY': 'scroll',
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
			marginLeft: '30px',
			borderRadius: '10px',
			backgroundColor: '#D5DBE7',
		},
	},
	morningNotesWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 30s -30s linear infinite',
		'willChange': 'transform',
		'&:hover': {
			cursor: 'pointer',
		},
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
	},
	morningNotesDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	morningNotesContent: {
		fontSize: '.9rem',
		color: '#151515',
	},
}));

export default useStyles;
