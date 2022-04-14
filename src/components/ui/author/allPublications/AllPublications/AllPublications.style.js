import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	page: {
		margin: '4.3vh auto 0 auto',
	},
	contentWrapper: {
		margin: '0 auto',
		display: 'flex',
	},
	statisticsColumn: {
		marginTop: '2vh',
		padding: 20,
		height: 700,
		border: '1px solid #ECEEF2',
		borderRadius: 8,
		minWidth: '28vh',
	},
	publicationsColumn: {
		marginTop: '1vh',
	},
});

export default useStyles;
