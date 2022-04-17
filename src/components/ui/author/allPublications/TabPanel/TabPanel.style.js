import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	panel: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingLeft: '18px',
		paddingTop: '3px',
		justifyContent: 'space-between',
		[theme.breakpoints.only('lg')]: {
			justifyContent: 'flex-start',
		},
		paddingRight: 0,
	},
}));

export default useStyles;
