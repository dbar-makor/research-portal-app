import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	input: {
		'& .MuiOutlinedInput-root': {
			'borderRadius': '8px',
			'& fieldset': {
				borderColor: '#EDEFF3',
			},
			'&:hover fieldset': {
				border: '1px solid #EDEFF3',
			},
			'&.Mui-focused fieldset': {
				border: '1px solid #EDEFF3',
			},
			'& .MuiSelect-select:focus': {
				backgroundColor: 'transparent',
				borderRadius: '8px',
			},
		},
		'& .MuiInputAdornment-root': {
			marginRight: 8,
		},
		'& .MuiOutlinedInput-input': {
			'padding': '11px',
			'&::placeholder': {
				color: '#868DA2',
				opacity: 1,
			},
		},

		'& .MuiInputLabel-outlined': {
			transform: 'translate(12px, 12px) scale(1)',
		},
		'& .MuiIconButton-root': {
			'padding': 7,
			'&:hover': {},
		},
	},
	calendarIcon: {
		'& g': {
			'& path': {
				stroke: '#1C67FF',
			},
		},
	},
}));

export default useStyles;
