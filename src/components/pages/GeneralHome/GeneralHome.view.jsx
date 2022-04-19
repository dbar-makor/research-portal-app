import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Carousel from 'react-material-ui-carousel';
import { format } from 'date-fns';
import useStyles, { Tab, TabPanel, TabsList } from './GeneralHome.style';

const formatLongString = (str, lgth) => {
	if (str.length > 35) {
		return `${str.substring(0, lgth)}...`;
	} else {
		return str;
	}
};

const getAuthorsInitials = (author) => {
	const tempArr = author.split(' ');

	tempArr[0] = tempArr[0].substring(0, 1).concat('.');

	return tempArr.join(' ');
};

const GeneralHomeView = (props) => {
	const classes = useStyles();

	const renderDay = (day) => {
		const dates = day.getDate();

		const dateStyle = {
			color: '#000',
			fontSize: 20,
		};

		const dateCellStyle = {
			width: 38,
		};

		const circleStyle = props.events.includes(dates)
			? { background: '#1c67ff' }
			: props.today === dates
			? { background: '#ed5858' }
			: { background: '#ACB1BF' };

		return (
			<div style={dateCellStyle}>
				<div style={dateStyle}>{dates}</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '4px',
					}}
				>
					<div style={circleStyle} className="circle" />
				</div>
			</div>
		);
	};

	const lastPublicationsSection = (pub) => (
		<section key={pub.id} className={classes.lastPublicationsWrapper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div className={classes.lastPublicationsTitle} style={{ flex: '65%' }}>
					{formatLongString(pub.title, 32)}
				</div>
				<div className={classes.lastPublicationsTitle} style={{ flex: '30%' }}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.lastPublicationsContent}>{formatLongString(pub.description, 60)}</div>
			</div>
		</section>
	);

	const latestNewsSection = (pub) => (
		<section key={pub.id} className={classes.latestNewsWrapper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div className={classes.latestNewsHeader}>{pub.author_name}</div>
				<div className={classes.latestNewsHeader}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.latestNewsContent}>{formatLongString(pub.title, 30)}</div>
			</div>
		</section>
	);

	const morningNotesSection = (pub) => (
		<section key={pub.id} className={classes.morningNotesWrapper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					padding: '5px',
				}}
			>
				<div className={classes.morningNotesContent}>{formatLongString(pub.title, 30)}</div>
				<div className={classes.morningNotesDate}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
		</section>
	);

	const industryRecoursedSection = (pub) => (
		<section key={pub.id} className={classes.industryRecoursedWrapper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Stack direction="row" spacing={1}>
					{pub.tags?.[0] && (
						<Chip
							style={{
								backgroundColor: '#E2EBFC',
								color: '#1C67FF',
								fontWeight: '600',
								fontSize: '.85rem',
							}}
							label={pub.tags?.[0].name}
						/>
					)}
					{pub.tags?.[1] && (
						<Chip
							style={{
								backgroundColor: '#E2EBFC',
								color: '#1C67FF',
								fontWeight: '600',
								fontSize: '.85rem',
							}}
							label={pub.tags?.[1].name}
						/>
					)}
				</Stack>
				<div className={classes.industryRecoursedDate}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.industryRecoursedContent}>
					{`${pub.author_name}:`}
					&nbsp;
					<span style={{ fontWeight: 'bold' }}>{formatLongString(pub.title, 30)}</span>
				</div>
			</div>
		</section>
	);

	const focusIdeasSection = (pub) => (
		<section key={pub.id} className={classes.focusIdeasWrapper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Stack direction="row" spacing={1}>
					{pub.tags?.[0] && (
						<Chip
							style={{
								backgroundColor: '#B8C3D8',
								color: '#3E3E3E',
								fontWeight: '600',
								fontSize: '.85rem',
							}}
							label={pub.tags?.[0].name}
						/>
					)}
					{pub.tags?.[1] && (
						<Chip
							style={{
								backgroundColor: '#B8C3D8',
								color: '#3E3E3E',
								fontWeight: '600',
								fontSize: '.85rem',
							}}
							label={pub.tags?.[1].name}
						/>
					)}
				</Stack>
				<div className={classes.focusIdeasDate}>{format(new Date(pub.updated_at), 'dd/MM/yyyy')}</div>
			</div>
			<div>
				<div className={classes.focusIdeasContent}>
					{`${pub.author_name} |`}
					&nbsp;
					<span style={{ color: '#000' }}>{formatLongString(pub.title, 38)}</span>
				</div>
			</div>
		</section>
	);

	const mostClickedIdeasSection = (pub) => (
		<section key={pub.id} className={classes.mostClickedIdeasWrapper}>
			<div style={{ marginRight: '15px', marginTop: 5, marginBottom: 5 }}>
				<div className={classes.mostClickedIdeasTitle}>idea</div>
				<div className={classes.mostClickedIdeasContent}>{formatLongString(pub.title, 40)}</div>
			</div>
			<div>
				<div className={classes.mostClickedIdeasTitle}>
					{pub.categories?.find((category) => category.name !== 'idea').name}
				</div>
				<div className={classes.mostClickedIdeasTitle} style={{ fontSize: '1rem' }}>
					{getAuthorsInitials(pub.author_name)}
				</div>
			</div>
		</section>
	);

	return (
		<main style={{ padding: '1% 15% 1% 15%' }} className={classes.mainWrapper}>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<section className={classes.carousel}>
						<div className={classes.header}>Featured</div>
						<Carousel
							style={{ display: 'flex' }}
							navButtonsProps={{
								style: {
									backgroundColor: '#B8C3D8',
									borderRadius: '30px',
								},
							}}
							indicatorIconButtonProps={{
								style: {
									color: '#E2EBFC',
								},
							}}
							activeIndicatorIconButtonProps={{
								style: {
									color: '#1C67FF',
								},
							}}
						>
							{props.featuredPublications.length
								? props.featuredPublications.map((publication) => (
										<div key={publication.id} className={classes.carouselContect}>
											{publication.title}
										</div>
								  ))
								: null}
						</Carousel>
					</section>
				</Grid>
				<Grid item xs={7}>
					<section className={classes.mostClickedIdeasBox}>
						<div className={classes.header}>Most Clicked Ideas</div>
						<div className={classes.horizontalScrollWrapper}>
							{props.mostClickedIdeas.length
								? props.mostClickedIdeas.map((pub) => mostClickedIdeasSection(pub))
								: null}
						</div>
					</section>
				</Grid>
				<Grid item xs={3.5}>
					<section className={classes.lastPublications}>
						<div
							style={{
								fontWeight: 700,
								marginBottom: '10px',
							}}
						>
							Last Publications
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Asia-Pacific</Tab>
								<Tab>Europe</Tab>
								<Tab>United-States</Tab>
							</TabsList>
							<TabPanel value={0}>
								{props.lastPublications.length
									? props.lastPublications
											.filter((pub) => pub.region === 'Asia-Pacific')
											.map((pub) => lastPublicationsSection(pub))
									: null}
							</TabPanel>
							<TabPanel value={1}>
								{props.lastPublications.length
									? props.lastPublications
											.filter((pub) => pub.region === 'Europe')
											.map((pub) => lastPublicationsSection(pub))
									: null}
							</TabPanel>
							<TabPanel value={2}>
								{props.lastPublications.length
									? props.lastPublications
											.filter((pub) => pub.region === 'United-States')
											.map((pub) => lastPublicationsSection(pub))
									: null}
							</TabPanel>
						</TabsUnstyled>
					</section>
					<section className={classes.latestNews}>
						<div className={`${classes.header} ${classes.headerScrolled}`}>Latest News</div>
						<div className={classes.latestNewsScroll}>
							{props.latestNews.length
								? props.latestNews.map((pub) => latestNewsSection(pub))
								: null}
						</div>
					</section>
					<section className={classes.morningNotes}>
						<div className={classes.header} style={{ marginBottom: '10px' }}>
							Morning Notes
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Asia-Pacific</Tab>
								<Tab>Europe</Tab>
								<Tab>United-States</Tab>
							</TabsList>
							<TabPanel value={0}>
								<div className={classes.morningNotesScroll}>
									{props.morningNotes.length
										? props.morningNotes
												.filter((pub) => pub.region === 'Asia-Pacific')
												.map((pub) => morningNotesSection(pub))
										: null}
								</div>
							</TabPanel>
							<TabPanel value={1}>
								<div className={classes.morningNotesScroll}>
									{props.morningNotes.length
										? props.morningNotes
												.filter((pub) => pub.region === 'Europe')
												.map((pub) => morningNotesSection(pub))
										: null}
								</div>
							</TabPanel>
							<TabPanel value={2}>
								<div className={classes.morningNotesScroll}>
									{props.morningNotes.length
										? props.morningNotes
												.filter((pub) => pub.region === 'United-States')
												.map((pub) => morningNotesSection(pub))
										: null}
								</div>
							</TabPanel>
						</TabsUnstyled>
					</section>
				</Grid>
				<Grid item xs={5}>
					<section className={classes.industryRecoursed}>
						<div className={classes.header}>Industry Recoursed</div>
						{props.industryRecoursed.length
							? props.industryRecoursed.map((pub) => industryRecoursedSection(pub))
							: null}
					</section>
					<section className={classes.focusIdeas}>
						<div className={`${classes.header} ${classes.headerScrolled}`}>Focus Ideas</div>
						<div className={classes.focusIdeasScroll}>
							{props.focusIdeas.length
								? props.focusIdeas.map((pub) => focusIdeasSection(pub))
								: null}
						</div>
					</section>
				</Grid>
				<Grid item xs={3.5}>
					<section className={classes.events}>
						<div
							style={{
								fontWeight: 700,
								marginBottom: '10px',
							}}
						>
							Events
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Upcoming</Tab>
								<Tab>Marked</Tab>
							</TabsList>
							<TabPanel value={0}>
								<div>
									<Helmet>
										<style>
											{`
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
													height: 2.5vw;
													width: 3vw;
													table-layout: fixed;
												}
												.DayPicker-Day--today {
													font-weight: 400;
												}
												.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
													background-color: #fff;
												}
												.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
													background-color: white;
												}
												.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
													font-weight: bold;
													background-color: white;
												}
												.DayPicker-Month {
													margin: 0;
													margin-top: 20px;
												}
												.DayPicker-wrapper {
													padding-bottom: 0;
												}
												.DayPicker-Months {
													display: table;
													width: 100%;
													table-layout: fixed;
												}
												.DayPicker-NavButton {
													margin-top: 6px;
												}
												.DayPicker-Weekday {
													font-size: 1em;
												}
											`}
										</style>
									</Helmet>
									<DayPicker
										renderDay={renderDay}
										selectedDays={props.selectedDay}
										onDayClick={props.setSelectedDay}
									/>
								</div>
								<section className={classes.eventsWrapper}>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{
												backgroundColor: '#ED5858',
											}}
											className={classes.eventsLabel}
										/>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#ED5858',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													Today
												</div>
											</div>
										</div>
									</div>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{
												backgroundColor: '#FAC100',
											}}
											className={classes.eventsLabel}
										/>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#B8C3D8',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													Tomorrow
												</div>
											</div>
										</div>
									</div>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{ backgroundColor: '#00CA80' }}
											className={classes.eventsLabel}
										/>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#B8C3D8',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													2D
												</div>
											</div>
										</div>
									</div>
								</section>
							</TabPanel>
							<TabPanel value={1}>Second content</TabPanel>
						</TabsUnstyled>
					</section>
				</Grid>
			</Grid>
		</main>
	);
};

GeneralHomeView.displayName = 'MemberHomeView';
GeneralHomeView.defaultProps = {};

export default React.memo(GeneralHomeView);
