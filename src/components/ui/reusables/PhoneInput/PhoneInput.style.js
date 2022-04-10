/* eslint-disable import/exports-last */
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Popper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	flagImg: {
		height: 18,
		width: 24,
	},
	inputFlag: {
		position: 'absolute',
		top: '10px',
	},
	flagBox: {
		width: '200px',
	},
	phoneInput: {
		'& .MuiOutlinedInput-input': {
			width: '120px !important',
		},
	},
}));

export default useStyles;

export const StyledAutoComplete = withStyles(() => ({
	popupIndicatorOpen: {
		transform: 'rotate(0deg)',
	},
	root: {
		'& .MuiFormControl-root ': {
			'&:hover': {
				backgroundColor: '#FFFF',
			},
		},
	},

	inputRoot: {
		'height': '4.5vh',
		'color': '#0000',
		'border': '8px solid #ffff00',
		'fontWeight': 400,
		'fontSize': '6px',
		'backgroundColor': '#FFFF',
		'width': '95%',
		'&.MuiOutlinedInput-root ': {
			borderRadius: 0,
			borderBottom: '2px solid #A5AFC233',
		},
		'&.MuiIconButton-root': {
			color: '#0000',
		},
		'&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
			padding: '2px 0px 2px 0px',
		},
		'&.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
			padding: '2px 8px 4px 8px',
		},
		'& .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'&:hover .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
		'& .MuiAutocomplete-input': {
			marginLeft: '27px',
			marginTop: '2px',
		},
	},
	paper: {
		'&.MuiAutocomplete-paper': {
			backgroundColor: '#FFFF',
			borderBottom: '2px solid #FFFF',
			margin: 0,
			// marginTop: 5,
			borderRadius: 0,
			padding: 0,
			width: '100%',
		},
		'& .MuiAutocomplete-noOptions': {
			color: '#B6B6B6',
			fontSize: '14px',
		},
	},
	listbox: {
		'position': 'absolute',
		'&.MuiAutocomplete-listbox': {
			'&::-webkit-scrollbar': {
				width: '3px',
				height: '3px',
			},
			'&::-webkit-scrollbar-track': {
				boxShadow: 'inset 0 0 5px grey',
				borderRadius: '10px',
				// marginTop: 50
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#FFFF',
				borderRadius: '10px',
			},
		},
	},
	popupIndicator: {
		'&.MuiAutocomplete-popupIndicator': {
			'color': '#4885ff',
			'& .MuiSvgIcon-root': {
				width: '0.8em',
				position: 'absolute',
				top: 1,
			},
		},
	},
	option: {
		'&.MuiAutocomplete-option': {
			color: '#4885ff',
			fontSize: '14px',
		},
	},
}))(Autocomplete);

export const CustomTextField = withStyles(() => ({
	root: {
		'& .MuiFormLabel-root': {
			color: '#B8C3D8',
			fontSize: '16px',
		},
		'& .MuiOutlinedInput-root': {
			backgroundColor: '#ffff',
			border: '1px solid #A5AFC233',
			borderRadius: 5,
		},
		'& .MuiOutlinedInput-inputMarginDense': {
			padding: '13px 8px',
		},
		'& .MuiOutlinedInput-adornedEnd': {
			paddingRight: 0,
		},
		'& .MuiInputBase-input': {
			color: '#000',
			fontSize: '14px',
			fontWeight: 400,
		},
		'& .MuiInput-underline:before': {
			borderBottom: '1px solid #FFFF',
		},
		'& .MuiInput-underline:hover:before': {
			borderBottom: '1px solid #FFFF',
		},
		'& .MuiInput-underline:after': {
			borderBottom: '1px solid #FFFF',
		},
		'& .MuiInput-underline.Mui-error:after': {
			borderBottom: '1px solid #FFFF',
		},
		'& .MuiAutocomplete-endAdornment': {
			right: '10px !important',
		},
	},
}))(TextField);

export const PopperMy = (props) => {
	return <Popper {...props} style={{ width: 'fit-content' }} placement="bottom-start" />;
};

PopperMy.displayName = 'PopperMy';
