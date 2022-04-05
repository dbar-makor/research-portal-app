import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		'width': '100%',
		'color': '#000',
		'& svg': {
			fill: '#fff',
			right: (props) => (props.svgRight ? props.svgRight : 0),
		},
		'&::placeholder': {
			color: '#fff',
			opacity: 1,
		},
	},
	label: {
		color: '#fff',
	},
	select: {
		'& .MuiInputBase-input': {
			color: '#fff',
		},
	},
}));

export default useStyles;
