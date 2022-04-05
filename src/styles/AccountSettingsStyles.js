import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	chosenRoute: {
		padding: '30px 0 30px 0',
		color: '#1C67FF',
		backgroundColor: '#e0ebfc',
		cursor: 'pointer',
	},
	notChosen: {
		padding: '30px 0 30px 0',
		color: '#000000',
		backgroundColor: 'none',
		cursor: 'pointer',
	},
	iconOn: {
		display: 'flex',
		alignSelf: 'center',
		justifyContent: 'center',
		paddingInline: '24px 10px',
		color: '#1C67FF',
	},
	icon: {
		color: '#B8C3D8',
		display: 'flex',
		alignSelf: 'center',
		paddingInline: '24px 10px',
	},
}));
