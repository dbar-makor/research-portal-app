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
	mostClickedIdeasWrapper: {
		'display': 'flex',
		'justifyContent': 'space-between',
		'padding': '0 10px 0 10px',
		'maxHeight': '9vh',
		'minHeight': 72,
		'overflowY': 'hidden',
		'minWidth': '25.2vh',
		'margin': '10px',
		'marginTop': 8,
		'alignItems': 'center',
		'borderRadius': '8px',
		'backgroundColor': '#EDF2FB',
		'willChange': 'transform',
		'animation': 'mostClickedIdeas 20s linear infinite',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	mostClickedIdeasTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
	},
	mostClickedIdeasContent: {
		color: '#151515',
		fontSize: '1rem',
	},
	carousel: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px 10px 2px 10px',
		minHeight: 111,
	},
	carouselContect: {
		'maxHeight': '4vh',
		'textAlign': 'center',
		'fontSize': '1.1rem',
		'padding': '0 3% 0 3%',
		'marginTop': 10,
		'marginBottom': 10,
		'&:hover': {
			cursor: 'pointer',
		},
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
	focusIdeasDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	focusIdeasContent: {
		color: '#8197ae',
		fontSize: 'clamp(12px, 6px + 0.5vw, 16px)',
		marginTop: '8px',
	},
	lastPublicationsTabsList: {
		[theme.breakpoints.down('md')]: {
			transform: 'scale(1, 0.95)',
			fontSize: 12,
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
	lastPublicationsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'backgroundColor': '#EDF2FB',
		'padding': '8px 12px 8px 12px',
		'borderRadius': '8px',
		'marginTop': '10px',
		'maxHeight': 58,
		'overflowY': 'hidden',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	lastPublicationsTopRow: {
		'display': 'flex',
		'flexDirection': 'row',
		'justifyContent': 'space-between',
		'marginBottom': 0,
		'@media (min-width: 1500px)': {
			marginBottom: 5,
		},
	},
	lastPublicationsTitle: {
		color: '#8197ae',
		fontSize: '.9rem',
		lineHeight: 1.1,
	},
	lastPublicationsContent: {
		'color': '#151515',
		'fontWeight': 'bold',
		'fontSize': 'calc(8px + 0.3vw)',
		'marginTop': '5px',
		'lineHeight': 1.1,
		'@media (max-height: 900px)': {
			display: 'none',
		},
	},
	industryRecoursed: {
		marginBottom: '25px',
	},
	industryRecoursedWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '7px 10px',
		'marginTop': '8px',
		'borderRadius': '8px',
		'border': '2px solid #EDEEF1',
		'backgroundColor': '#fff',
		'&:hover': {
			cursor: 'pointer',
		},
		'@media (max-width: 1530px)': {
			'&:last-of-type': {
				display: 'none',
			},
		},
		'@media (max-height: 880px)': {
			'&:nth-of-type(n + 5)': {
				display: 'none',
			},
		},
	},

	industryRecoursedUpperRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column !important',
			height: 50,
		},
	},
	industryRecoursedStack: {
		flexDirection: 'row !important',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	industryRecoursedChip: {
		backgroundColor: '#E2EBFC !important',
		color: '#1C67FF !important',
		fontWeight: '600',
		fontSize: '.75rem !important',
		marginRight: 10,
		[theme.breakpoints.down('md')]: {
			'&:not(:first-of-type)': {
				display: 'none',
			},
		},
	},
	industryRecoursedDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	industryRecoursedContent: {
		color: '#151515',
		fontSize: 'calc(8px + 0.3vw)',
		marginTop: '10px',
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
	latestNewsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 25s -25s linear infinite',
		'willChange': 'transform',
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
		'&:hover': {
			cursor: 'pointer',
		},
	},
	latestNewsHeader: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	latestNewsContent: {
		color: '#151515',
		fontSize: '1.04rem',
		marginTop: '10px',
	},
	morningNotes: {
		borderRadius: '8px',
		backgroundColor: '#fff',
		border: '2px solid #EDEEF1',
		padding: '10px',
		minHeight: '29vh',
	},
	morningNotesWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': '4px',
		'margin': '5px',
		'minWidth': '25.2vh',
		'animation': 'latestNews 30s -30s linear infinite',
		'willChange': 'transform',
		'&:hover': {
			cursor: 'pointer',
		},
		'&:not(:last-child)': {
			borderBottom: '1px solid #EDEDF0',
		},
	},
	morningNotesScroll: {
		'display': 'flex',
		'flexDirection': 'column',
		'minHeight': '21vh',
		'maxHeight': '21vh',
		'marginTop': '2px',
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
			marginLeft: '30px',
			borderRadius: '10px',
			backgroundColor: '#D5DBE7',
		},
	},
	morningNotesDate: {
		fontSize: '.9rem',
		color: '#8197ae',
	},
	morningNotesContent: {
		fontSize: '.9rem',
		color: '#151515',
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
	eventsWrapper: {
		'display': 'flex',
		'flexDirection': 'column',
		'padding': '12px 12px 12px 0',
		'marginTop': '20px',
		'marginLeft': '-10px',
		'maxHeight': 'calc(540px - 3vw)',
		'@media (max-width: 1700px)': {
			maxHeight: 'calc(540px - 2vw)',
		},
		'@media (max-width: 1450px)': {
			maxHeight: 'calc(540px - 1vw)',
		},
		'@media (max-width: 1400px)': {
			maxHeight: 'calc(570px - 1vw)',
		},
		'@media (max-width: 1150px)': {
			maxHeight: 'calc(590px - 1vw)',
		},
		'overflowY': 'auto',
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
	eventsInnerWrapper: (props) => ({
		'display': 'flex',
		'position': 'relative',
		'justifyContent': 'center',
		'height': 45,
		'&:not(:last-child)': {
			marginBottom: '15px',
		},
		'&:hover': {
			cursor: props.isAuthenticated ? 'pointer' : 'default',
		},
		'&:hover > div:first-of-type': {
			width: props.isAuthenticated ? '98%' : 0,
			height: 35,
			position: props.isAuthenticated ? 'absolute' : 'static',
			top: 0,
			left: 0,
		},
		'&:hover > div:nth-of-type(2)': {
			'display': props.isAuthenticated ? 'none' : 'flex',
			'width': props.isAuthenticated ? 0 : '100%',
			'& div': {
				display: props.isAuthenticated ? 'none' : 'flex',
			},
		},
		'&:hover > div:first-of-type svg': {
			display: props.isAuthenticated ? 'inline' : 'none',
		},
		'&:hover div span': {
			display: props.isAuthenticated ? 'inline' : 'none',
		},
	}),
	eventsLabel: {
		padding: '5px',
		marginRight: '10px',
		borderRadius: '0 2px 2px 0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 0,
		transition: 'width 0.5s, display 0.5s',
	},
	markboxWrapper: {
		display: 'flex',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	markBox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	bookmarkIcon: {
		marginRight: 5,
		paddingTop: 3,
		display: 'none',
		fill: '#fff',
		fontSize: 16,
	},
	addSpan: {
		color: '#fff',
		fontSize: 16,
		display: 'none',
	},
	eventsContentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		transition: 'width 0.5s',
		maxHeight: 50,
		overflowY: 'hidden',
		overflowX: 'hidden',
	},
	eventsInnerContentWrapper: {
		'display': 'flex',
		'flexDirection': 'row',
		'justifyContent': 'space-between',
		'&:not(:last-child)': {
			marginBottom: '4px',
			marginTop: 3,
		},
		'&:last-child': {
			marginTop: -6,
		},
	},
	eventsHeader: {
		color: '#0F0F0F',
		fontWeight: 'bold',
		fontSize: '.9rem',
		display: 'flex',
		alignItems: 'center',
	},
	miniBookmark: {
		fill: '#B8C3D8',
		fontSize: 15,
		paddingTop: 4,
		marginRight: 5,
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
	background-color:rgba(0, 202, 128, 0.4);
	border-radius: 50%;
}

.DayPicker-Day--today:hover > .today {
	background-color:rgba(255, 99, 71, 0.4);
	border-radius: 50%;
}
.DayPicker-Day:hover > .tomorrow {
	background-color:rgba(250, 193, 0, 0.4);
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
