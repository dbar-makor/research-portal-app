import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	focusIdeasWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '10px',
		'animation': 'latestNews 20s linear infinite',
		'marginTop': '10px',
		'borderRadius': '8px',
		'backgroundColor': '#F3F4F8',
		'marginRight': '8px',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	focusIdeasChip: {
		backgroundColor: '#B8C3D8 !important',
		color: '#3E3E3E !important',
		fontWeight: '600',
		fontSize: '.8rem !important',
		[theme.breakpoints.down('md')]: {
			'&:not(:first-of-type)': {
				display: 'none',
			},
		},
	},
	focusIdeasDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	focusIdeasContent: {
		color: '#8197ae',
		fontSize: 'clamp(12px, 6px + 0.5vw, 16px)',
		marginTop: '8px',
	},
}));

export default useStyles;
