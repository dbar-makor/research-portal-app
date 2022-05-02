import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	panel: {
		'display': 'flex',
		'flexWrap': 'wrap',
		'paddingLeft': '18px',
		'paddingTop': '3px',
		'justifyContent': 'space-between',
		'@media (max-width: 1440px)': {
			justifyContent: 'center',
		},
		// [theme.breakpoints.only('lg')]: {
		// 	justifyContent: 'flex-start',
		// },
		'paddingRight': 0,
	},
});

export default useStyles;
