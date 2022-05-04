import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	paginationBox: {
		marginTop: '2vh',
	},
	arrows: {
		justifyContent: 'center',
	},
	arrow: {
		fontSize: 22,
		fill: '#1D67FF',
	},
	secondArrowBack: {
		marginLeft: -12,
	},
	secondArrowForward: {
		marginRight: -12,
	},
	numbers: {
		fontSize: 22,
		color: '#001858',
	},
}));

export default useStyles;
