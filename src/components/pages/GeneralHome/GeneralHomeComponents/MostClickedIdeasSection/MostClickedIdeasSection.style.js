import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	mostClickedIdeasWrapper: {
		'display': 'flex',
		'justifyContent': 'space-between',
		'padding': '0 10px 0 10px',
		'maxHeight': '9vh',
		'minHeight': 72,
		'overflowY': 'hidden',
		'minWidth': '25.2vh',
		'margin': '10px',
		'marginTop': 8,
		'alignItems': 'center',
		'borderRadius': '8px',
		'backgroundColor': '#EDF2FB',
		'willChange': 'transform',
		'animation': 'mostClickedIdeas 20s linear infinite',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	mostClickedIdeasTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
	},
	mostClickedIdeasContent: {
		color: '#151515',
		fontSize: '1rem',
	},
}));

export default useStyles;
