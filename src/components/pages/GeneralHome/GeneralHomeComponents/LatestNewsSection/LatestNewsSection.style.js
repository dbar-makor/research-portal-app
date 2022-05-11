import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	latestNewsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 25s -25s linear infinite',
		'willChange': 'transform',
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
		'&:hover': {
			cursor: 'pointer',
		},
	},
	latestNewsHeader: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	latestNewsContent: {
		color: '#151515',
		fontSize: '1.04rem',
		marginTop: '10px',
	},
}));

export default useStyles;
