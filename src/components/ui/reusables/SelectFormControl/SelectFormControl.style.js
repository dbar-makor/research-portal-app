import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		'width': (props) => (props.width ? props.width : '97.5%'),
		'color': '#868DA2',
		'borderRadius': '8px',
		'border': '1px solid #A5AFC233',
		'& .MuiInput-formControl': {
			marginTop: 0,
		},
		'paddingLeft': 7,
		'paddingTop': 7,
		'paddingBottom': 0,
		'marginBottom': 16,
		'height': 38,
		'& .MuiSelect-select:focus': {
			backgroundColor: 'transparent',
		},
		'& .MuiInputLabel-formControl': {
			top: -10,
			left: 7,
		},
		'& .Mui-focused': {
			color: '#868DA2',
		},
		'& .MuiFormLabel-root': {
			color: '#868DA2',
		},
		'& .MuiInputLabel-shrink': {
			backgroundColor: '#fff',
			padding: '0 3px 0 3px',
			top: -8,
		},
		'& svg': {
			fill: '#1C67FF',
			right: (props) => (props.svgRight ? props.svgRight : -5),
			top: 12,
			transform: 'none',
		},

		'&::placeholder': {
			color: '#868DA2',
			opacity: 1,
		},
	},
	label: {
		color: '#868DA2',
	},
}));

export default useStyles;
