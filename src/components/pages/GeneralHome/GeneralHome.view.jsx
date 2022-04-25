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
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';

//import { Link } from 'react-router-dom';
import useStyles, { Tab, TabPanel, TabsList, dayPickerStyle } from './GeneralHome.style';

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

	const lastPublicationsSection = (pub) => (
		<section
			key={pub.id}
			className={classes.lastPublicationsWrapper}
			onClick={() => props.handleClick(pub.id)}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div className={classes.lastPublicationsTitle} style={{ flex: '80%' }}>
					{formatLongString(pub.title, 38)}
					{/* {pub.title} */}
				</div>
				<div className={classes.lastPublicationsTitle} style={{ flex: '20%' }}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.lastPublicationsContent}>{formatLongString(pub.description, 60)}</div>
			</div>
		</section>
	);

	const latestNewsSection = (pub) => (
		<section key={pub.id} className={classes.latestNewsWrapper} onClick={() => props.handleClick(pub.id)}>
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
		//<Link to={props.whereToLink}>
		<section
			key={pub.id}
			className={classes.morningNotesWrapper}
			onClick={() => props.handleClick(pub.id)}
		>
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
		//</Link>
	);

	const industryRecoursedSection = (pub) => (
		<section
			key={pub.id}
			className={classes.industryRecoursedWrapper}
			onClick={() => props.handleClick(pub.id)}
		>
			<div className={classes.industryRecoursedUpperRow}>
				{pub.tags?.length ? (
					<Stack className={classes.industryRecoursedStack}>
						{pub.tags?.[0] && (
							<Chip
								style={{
									backgroundColor: '#E2EBFC',
									color: '#1C67FF',
									fontWeight: '600',
									fontSize: '.85rem',
									marginRight: 10,
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
				) : null}
				<div className={classes.industryRecoursedDate}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.industryRecoursedContent}>
					{`${pub.author_name}:`}
					&nbsp;
					<span style={{ fontWeight: 'bold' }}>{pub.title}</span>
					{/* <span style={{ fontWeight: 'bold' }}>{formatLongString(pub.title, 30)}</span> */}
				</div>
			</div>
		</section>
	);

	const focusIdeasSection = (pub) => (
		<section key={pub.id} className={classes.focusIdeasWrapper} onClick={() => props.handleClick(pub.id)}>
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
		<section
			key={pub.id}
			className={classes.mostClickedIdeasWrapper}
			onClick={() => props.handleClick(pub.id)}
		>
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

	const renderDay = (day) => {
		const dates = day.getDate();

		console.log('new Date().getDate()', new Date().getDate());
		console.log('new Date().getDate() === dates', new Date().getDate() === dates);
		const dateStyle = {
			color: '#000',
			fontSize: 20,
		};

		const dateCellStyle = {
			width: 38,
		};

		const circleStyle = props.eventsDays.includes(dates)
			? { background: '#1c67ff' }
			: new Date().getDate() === dates
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

	const compareDates = (date1) => {
		if (isSameDay(date1, new Date())) return { color: '#ED5858', label: 'Today' };

		if (isSameDay(date1, addDays(new Date(), 1))) return { color: '#FAC100', label: 'Tomorrow' };

		return { color: '#00CA80', label: formatDistanceToNowStrict(date1) };
	};

	const eventBox = (event) => (
		<div key={event.id} className={classes.eventsInnerWrapper}>
			<div
				style={{ backgroundColor: compareDates(new Date(event.date)).color }}
				className={classes.eventsLabel}
			/>
			<div className={classes.eventsContentWrapper}>
				<div className={classes.eventsInnerContentWrapper}>
					<div className={classes.eventsHeader}>{event.title}</div>
					<div style={{ color: '#868DA2' }}>{format(new Date(event.date), 'dd/MM/yyyy')}</div>
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
							color: compareDates(new Date(event.date)).color,
							fontSize: '.9rem',
							fontWeight: '600',
						}}
					>
						{compareDates(new Date(event.date)).label}
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<main className={classes.mainWrapper}>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					{/* carousel */}
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
								? props.featuredPublications.map((pub) => (
										<div
											key={pub.id}
											className={classes.carouselContect}
											onClick={() => props.handleClick(pub.id)}
										>
											{pub.title}
										</div>
								  ))
								: null}
						</Carousel>
					</section>
				</Grid>
				{/* most clicked */}
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
				{/* last pubs, latest news, morning notes */}
				<Grid xs={4.5} item xl={3.5}>
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
				{/* indus recoursed, focus ideas */}
				<Grid item xs={4} xl={5}>
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
				{/* events */}
				<Grid item xs={3.5} xl={3.5}>
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
							{props.isAuthenticated && (
								<TabsList>
									<Tab>Upcoming</Tab>
									<Tab>Marked</Tab>
								</TabsList>
							)}

							<TabPanel value={0}>
								<div>
									<Helmet>
										<style>{dayPickerStyle}</style>
									</Helmet>
									<DayPicker
										renderDay={renderDay}
										selectedDays={props.selectedDay}
										onDayClick={props.setSelectedDay}
										onMonthChange={(month) => {
											props.setDate(month);
										}}
									/>
								</div>
								<section className={classes.eventsWrapper}>
									{props.events?.length
										? props.events.map((event) => eventBox(event))
										: null}
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
