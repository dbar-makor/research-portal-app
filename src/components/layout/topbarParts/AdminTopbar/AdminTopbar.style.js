import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	menueWrapper: {
		minWidth: '180px',
	},
	textStyle: {
		fontSize: 16,
		color: '#0F0F0F',
		cursor: 'pointer',
		fontWeight: 500,
	},
	expandLessIcon: {
		color: '#0F0F0F',
	},
}));

export default useStyles;
