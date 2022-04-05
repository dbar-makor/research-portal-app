import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	field: {
		'& .MuiSvgIcon-root': {
			color: '#1C67FF',
		},
		'& .MuiSelect-nativeInput': {},
	},
}));

export default useStyles;
