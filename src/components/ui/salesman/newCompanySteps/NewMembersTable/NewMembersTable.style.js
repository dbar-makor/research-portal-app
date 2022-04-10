import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	tableWrapper: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	tableSkin: {
		'height': 290,
		'minWidth': '450px',
		'overflowY': 'auto',
		'overflowX': 'hidden',
		'boxShadow': 'none',
		'border': '1px solid #EDEEF1',
		'&::-webkit-scrollbar': {
			width: '4px',
			height: '3px',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 5px #FFFFFF',
			borderRadius: '10px',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#868DA2',
			borderRadius: '10px',
		},
	},
	table: {
		position: 'relative',
	},
	tableHead: {
		position: 'sticky',
		top: 0,
	},
	headerRow: {
		position: 'sticky',
		top: 0,
	},
	headerCell: {
		position: 'sticky',
		top: 0,
		background: '#fff',
		color: '#868DA2',
		fontSize: 14,
	},
	tableBody: {
		maxHeight: 80,
		overflowY: 'scroll',
	},
	dotsIcon: {
		'color': '#B8C3D8',
		'padding': '1px',
		'marginLeft': -15,
		'&:hover': {
			color: '#000',
			backgroundColor: '#fff',
			transition: '.3s',
		},
	},
	tableCell: {
		fontSize: 14,
		lineHeight: '1.2',
		padding: '10px 16px 10px 16px',
		border: 'none',
	},
	option: {
		'&:hover': {
			color: 'red',
			backgroundColor: 'white',
		},
	},
});

export default useStyles;
