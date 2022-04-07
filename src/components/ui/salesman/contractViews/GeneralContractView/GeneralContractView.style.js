import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	modalContainer: {
		backgroundColor: '#fff',
		maxWidth: '812px',
		minHeight: 800,
		marginTop: '5vh',
		marginBottom: '5vh',
		flexDirection: 'column',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalBox: {
		// height: 700,
	},
	modalTitle: {
		color: '#868DA2',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '5vh',
		marginTop: '15px',
		// textAlign: "center",
		fontFamily: 'Inter',
	},
}));

export default useStyles;
