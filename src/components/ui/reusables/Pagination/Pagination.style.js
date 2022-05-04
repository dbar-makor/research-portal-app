import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	paginationBox: {
		'marginTop': '2vh',
		'& .Mui-disabled': {
			'& svg': {
				fill: '#ACB1BF',
			},
		},
	},
	arrows: {
		justifyContent: 'center',
	},
	btn: {
		padding: '12px 12px 12px 16px',
	},
	doubleBtnPrev: {
		padding: '12px 4px 12px 12px',
	},
	doubleBtnNext: {
		padding: '12px 10px 12px 10px',
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
		color: '#1D67FF',
		fontWeight: 'bold',
	},
}));

export default useStyles;
