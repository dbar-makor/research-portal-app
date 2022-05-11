import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	industryRecoursedWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '7px 10px',
		'marginTop': '8px',
		'borderRadius': '8px',
		'border': '2px solid #EDEEF1',
		'backgroundColor': '#fff',
		'&:hover': {
			cursor: 'pointer',
		},
		'@media (max-width: 1530px)': {
			'&:last-of-type': {
				display: 'none',
			},
		},
		'@media (max-height: 880px)': {
			'&:nth-of-type(n + 5)': {
				display: 'none',
			},
		},
	},

	industryRecoursedUpperRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column !important',
			height: 50,
		},
	},
	industryRecoursedStack: {
		flexDirection: 'row !important',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	industryRecoursedChip: {
		backgroundColor: '#E2EBFC !important',
		color: '#1C67FF !important',
		fontWeight: '600',
		fontSize: '.75rem !important',
		marginRight: 10,
		[theme.breakpoints.down('md')]: {
			'&:not(:first-of-type)': {
				display: 'none',
			},
		},
	},
	industryRecoursedDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	industryRecoursedContent: {
		color: '#151515',
		fontSize: 'calc(8px + 0.3vw)',
		marginTop: '10px',
	},
}));

export default useStyles;
