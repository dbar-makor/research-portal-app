import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	menueWrapper: {
		minWidth: '180px',
	},
	textStyle: {
		fontSize: 16,
		color: '#fffff',
		cursor: 'pointer',
		fontWeight: 300,
	},
	expandLessIcon: {
		color: '#fff',
	},
}));

export default useStyles;
