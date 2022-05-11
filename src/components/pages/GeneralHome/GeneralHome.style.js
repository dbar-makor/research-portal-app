import { makeStyles } from '@material-ui/core/styles';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { styled } from '@mui/material/styles';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

const useStyles = makeStyles((theme) => ({
	header: {
		fontWeight: 700,
	},
	headerScrolled: {
		paddingBottom: 10,
	},
	mainWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FEFEFE',
		marginTop: '16px',
		padding: '2% 15% 1% 15%',
		[theme.breakpoints.down('lg')]: {
			padding: '3% 7% 1% 7%',
		},
		[theme.breakpoints.down('md')]: {
			padding: '3% 5% 1% 5%',
		},
	},
	link: {
		textDecoration: 'none',
		color: '#151515',
	},
	mostClickedIdeasBox: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
		paddingBottom: 2,
	},
	horizontalScrollWrapper: {
		display: 'flex',
		minHeight: '7.9vh',
		overflow: 'hidden',
	},
	carousel: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px 10px 2px 10px',
		minHeight: 111,
	},
	column: {
		'height': '100vh',
		'overflow': 'hidden',
		'display': 'flex',
		'flexDirection': 'column !important',
		'justifyContent': 'space-between',
		'flexWrap': 'nowrap',
		'&:nth-of-type(2n)': {
			marginRight: -16,
			paddingLeft: 0,
		},
		'&:last-of-type': {
			border: '2px solid #EDEEF1',
			borderRadius: '8px',
			marginTop: '0',
			padding: '8px 0 8px 0',
			marginLeft: '16px',
		},
	},
	focusIdeas: {
		padding: '10px',
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
	},
	focusIdeasWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '10px',
		'animation': 'latestNews 20s linear infinite',
		'marginTop': '10px',
		'borderRadius': '8px',
		'backgroundColor': '#F3F4F8',
		'marginRight': '8px',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	focusIdeasScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'maxHeight': '36.5vh',
		'@media (max-width: 1530px)': {
			maxHeight: '40vh',
		},
		'@media (max-height: 880px) and (min-height: 815px)': {
			maxHeight: '50vh',
		},
		'@media (max-height: 814px) and (min-height: 750px)': {
			maxHeight: '45vh',
		},
		[theme.breakpoints.down('md')]: {
			maxHeight: '25vh',
		},
		'overflow': 'hidden',
		'overflowY': 'scroll',
		'&::-webkit-scrollbar-track': {
			borderRadius: '10px',
			backgroundColor: '#F3F4F8',
		},
		'&::-webkit-scrollbar': {
			borderRadius: '10px',
			maxWidth: '7px',
			zIndex: 2,
			backgroundColor: '#F5F5F5',
		},
		'&::-webkit-scrollbar-thumb': {
			borderRadius: '10px',
			backgroundColor: '#D5DBE7',
		},
	},
	focusIdeasChip: {
		backgroundColor: '#B8C3D8 !important',
		color: '#3E3E3E !important',
		fontWeight: '600',
		fontSize: '.8rem !important',
		[theme.breakpoints.down('md')]: {
			'&:not(:first-of-type)': {
				display: 'none',
			},
		},
	},
	lastPublications: {
		// maxHeight: '29.5vh',
		minHeight: '29.5vh',
		padding: '10px',
		marginBottom: '25px',
		borderRadius: '8px',
		border: '2px solid #EDEEF1',
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	industryRecoursed: {
		marginBottom: '25px',
	},
	latestNews: {
		padding: '10px',
		marginBottom: '25px',
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
	},
	latestNewsScroll: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '20.1vh',
		maxHeight: '20.1vh',
		overflow: 'hidden',
	},
	morningNotes: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
		minHeight: '29vh',
	},
	tablist: {
		'backgroundColor': '#e2ebfc',
		'borderRadius': 30,
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'alignContent': 'space-between',
		'minHeight': 'fit-content',
		[theme.breakpoints.down('md')]: {
			transform: 'scale(1, 0.9)',
		},
		'& span': {
			display: 'none',
		},
		'& button': {
			padding: '6px !important',
		},
		'& .Mui-selected': {
			backgroundColor: '#1D67FF',
		},
	},
	events: {
		minWidth: '29vh',
		minHeight: '92vh',
		padding: '10px',
		backgroundColor: '#fff',
		[theme.breakpoints.down('lg')]: {
			minWidth: '25vh',
		},
	},
}));

export default useStyles;

export const Tab = styled(TabUnstyled)`
	font-family: Inter;
	color: #868da2;
	cursor: pointer;
	font-size: 0.875rem;
	background-color: transparent;
	width: 100%;
	border: none;
	border-radius: 30px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: #ccdcfc;
		padding: 6px 6px;
	}

	&:focus {
		border-radius: 30px;
		outline-offset: 2px;
	}

	&.${tabUnstyledClasses.selected} {
		background-color: #1c67ff;
		padding: 6px 6px;
		color: #fff;
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
	font-size: 0.875rem;
`;

export const TabsList = styled(TabsListUnstyled)`
	background-color: #e2ebfc;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: space-between;
`;

export const dayPickerStyle = `
.DayPicker {
	font-family: Inter;
}
.DayPicker-Caption {
	color: #1C67FF;
}
.DayPicker-NavButton--next {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPCAYAAAA2yOUNAAAABHNCSVQICAgIfAhkiAAAAJ1JREFUKFNj3HX0lsG/v//i2f+yNzo6Kn5gwAIYdxy+MQEong/EF9j/sDtiU8i4f/99gZ8sPw8AFenjUsgIMp2QQrAiQgrhivApRFGESyGGIpDC7YevOzAyMO4HsRn/MwZiKAKH279/IAUC//8zLvS0U09AUYRNAdg0mO9wKYArwqcArIiQArAiWNzBHIk1gsFRwvozwcNGAxTRWAEA+rt/IR87yyoAAAAASUVORK5CYII=)
}
.DayPicker-NavButton--prev {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPCAYAAAA2yOUNAAAABHNCSVQICAgIfAhkiAAAAKVJREFUKFNjZMABth+6nsDEwPTB3U59AyM2NdsP3VzAyPg/Hij30cNWQwBDEZIChv///yd62mkuQFGETQHIJrgiXArgivApACvacfjGBCCdD+LA3IDuGZCiD0BBfiA+APSJIzbfMoLCg5GRcT5YkpFxgYeNeiKGSSABQgqRfIfbRLRwwq4QS4gjKWRgmAj0TAGOuIMrxB53MJ9tP3zdAcT2tNU8AAAtT14Qfdt8HwAAAABJRU5ErkJggg==)
}
.DayPicker-Day {
	padding: 0.2em;
	height: 2.0vw;
	width: 2.2vw;
	table-layout: fixed;
}

@media screen and (max-width: 1400px) {
	.DayPicker-Day {
		height: 1.5vw;
		width: 1.8vw;
	}
  }

  @media screen and (max-width: 1150px) {
	.DayPicker-Day {
		height: 1.3vw;
		width: 1.5vw;
		padding: 0.1em;

	}
  }

.DayPicker-Day div div {
	font-size: 14px;
}

@media screen and (max-width: 1250px) {
	.DayPicker-Day div div {
		font-size: 13px;

	}
  }

.DayPicker-Day--today {
	font-weight: 600;
}

.DayPicker-Day:hover .hasEvent {
	background-color:rgba(0, 202, 128, 0.15);
	border-radius: 50%;
}

.DayPicker-Day--today:hover > .today {
	background-color:rgba(255, 99, 71, 0.15);
	border-radius: 50%;
}
.DayPicker-Day:hover > .tomorrow {
	background-color:rgba(250, 193, 0, 0.15);
	border-radius: 50%;
	padding: 4px 0;
}

.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
	background-color: #fff;
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
	background-color: #fff;
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
	font-weight: bold;
	background-color: #fff;
}
.DayPicker-Month {
	margin:  auto;
	width: 100%;
}
@media screen and (max-width: 1400px) {
	.DayPicker-Month {
		transform: scale(0.94) translate(-0.7vw,0);
		
	}
  }

  @media screen and (max-width: 1030px) {
	.DayPicker-Month {
		transform: scale(0.85) translate(-2.7vw, 0);
	}
  }

.DayPicker-wrapper {
	padding-bottom: 0;
}
.DayPicker-Months {
	display: table;
	width: 100%;
	table-layout: fixed;
	margin: 20px auto 0 auto;
}
.DayPicker-NavBar {
	position: absolute;
	right: -15px;
	top: -14px
}

@media screen and (max-width: 1400px) {
	.DayPicker-NavBar  {
		transform: scale(0.94);
		right: 8px;
		top: -7px;
	}
  }


  @media screen and (max-width: 1250px) {
	.DayPicker-NavBar  {
		right: -5px;
		top: -8px;
	}
  }

  @media screen and (max-width: 1030px) {
	.DayPicker-NavBar  {
		transform: scale(0.85);
		right: -5px;
		top: 2px;
	}
  }


.DayPicker-Weekday {
	font-size: 1em;
}
.DayPicker-Weekday abbr {
	font-size: 14px;
}`;
