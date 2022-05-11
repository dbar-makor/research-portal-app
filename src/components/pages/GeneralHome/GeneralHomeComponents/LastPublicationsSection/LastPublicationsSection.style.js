import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	lastPublicationsTabsList: {
		[theme.breakpoints.down('md')]: {
			transform: 'scale(1, 0.95)',
			fontSize: 12,
		},
	},
	lastPublicationsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'backgroundColor': '#EDF2FB',
		'padding': '8px 12px 8px 12px',
		'borderRadius': '8px',
		'marginTop': '10px',
		'maxHeight': 58,
		'overflowY': 'hidden',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	lastPublicationsTopRow: {
		'display': 'flex',
		'flexDirection': 'row',
		'justifyContent': 'space-between',
		'marginBottom': 0,
		'@media (min-width: 1500px)': {
			marginBottom: 5,
		},
	},
	lastPublicationsTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
		lineHeight: 1.1,
	},
	lastPublicationsContent: {
		'color': '#151515',
		'fontWeight': 'bold',
		'fontSize': 'calc(8px + 0.3vw)',
		'marginTop': '5px',
		'lineHeight': 1.1,
		'@media (max-height: 900px)': {
			display: 'none',
		},
	},
}));

export default useStyles;
