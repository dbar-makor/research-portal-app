import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	carouselContect: {
		'maxHeight': '4vh',
		'textAlign': 'center',
		'fontSize': '1.1rem',
		'padding': '0 3% 0 3%',
		'marginTop': 10,
		'marginBottom': 10,
		'&:hover': {
			cursor: 'pointer',
		},
	},
}));

export default useStyles;
