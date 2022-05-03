import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TabsUnstyled from '@mui/base/TabsUnstyled';
// import { TabContext, TabList } from '@material-ui/lab';
// import Tabs from '@material-ui/core/Tabs';
import Grid from '@mui/material/Grid';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Helmet } from 'react-helmet';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Carousel from 'react-material-ui-carousel';
import { format } from 'date-fns';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import MessageAlert from '../../ui/reusables/MessageAlert/MessageAlert';
//import { Link } from 'react-router-dom';
import { ReactComponent as UnmarkIcon } from '../../../assets/icons/unmark.svg';
import useStyles, { Tab, TabPanel, TabsList, dayPickerStyle } from './GeneralHome.style';

const formatLongString = (str, lgth) => {
	if (str.length > 35) {
		return `${str.substring(0, lgth)}...`;
	} else {
		return str;
	}
};

const getAuthorsLastName = (author) => {
	const tempArr = author.split(' ');
	const lastName = tempArr[tempArr.length - 1];

	return lastName;
};

const GeneralHomeView = (props) => {
	const classes = useStyles(props);

	const lastPublicationsSection = (pub) => (
		<section
			key={pub.id}
			className={classes.lastPublicationsWrapper}
			onClick={() => props.handleClick(pub.id, pub.categories)}
		>
			<div className={classes.lastPublicationsTopRow}>
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
		<section
			key={pub.id}
			className={classes.latestNewsWrapper}
			onClick={() => props.handleClick(pub.id, pub.categories)}
		>
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
		<section
			key={pub.id}
			className={classes.morningNotesWrapper}
			onClick={() => props.handleClick(pub.id, pub.categories)}
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
	);

	const industryRecoursedSection = (pub) => (
		<section
			key={pub.id}
			className={classes.industryRecoursedWrapper}
			onClick={() => props.handleClick(pub.id, pub.categories)}
		>
			<div className={classes.industryRecoursedUpperRow}>
				{pub.tags?.length ? (
					<Stack className={classes.industryRecoursedStack}>
						<Chip
							className={classes.industryRecoursedChip}
							label={pub.tags?.[0] ? pub.tags?.[0].name : ''}
							style={pub.tags?.[0] ? {} : { visibility: 'hidden' }}
						/>
						<Chip
							className={classes.industryRecoursedChip}
							label={pub.tags?.[1] ? pub.tags?.[1].name : ''}
							style={pub.tags?.[1] ? {} : { visibility: 'hidden' }}
						/>
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
					<Chip
						className={classes.focusIdeasChip}
						label={pub.tags?.[0] ? pub.tags?.[0].name : ''}
						style={pub.tags?.[0] ? {} : { visibility: 'hidden' }}
					/>
					<Chip
						className={classes.focusIdeasChip}
						label={pub.tags?.[1] ? pub.tags?.[1].name : ''}
						style={pub.tags?.[1] ? {} : { visibility: 'hidden' }}
					/>
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
			onClick={() => props.handleClick(pub.id, pub.categories)}
		>
			<div style={{ marginRight: '15px', marginTop: 5, marginBottom: 5 }}>
				<div className={classes.mostClickedIdeasTitle}>idea</div>
				<div className={classes.mostClickedIdeasContent}>{formatLongString(pub.title, 28)}</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					marginTop: 5,
					marginBottom: 5,
					height: '100% - 10px',
				}}
			>
				<div className={classes.mostClickedIdeasTitle} style={{ lineHeight: 0.9, marginBottom: 10 }}>
					{
						pub.categories?.find(
							(category) => category.name !== 'idea' && category.name !== 'Ideas',
						).name
					}
				</div>
				<div
					className={classes.mostClickedIdeasTitle}
					style={{ fontSize: '1rem', fontStyle: 'italic' }}
				>
					{getAuthorsLastName(pub.author_name)}
				</div>
			</div>
		</section>
	);

	const getStyleAndClass = (day, today) => {
		if (isSameDay(day, today)) return [{ background: '#ed5858' }, 'today'];

		if (isSameDay(day, addDays(today, 1)) && props.eventsDays.includes(addDays(today, 1).getDate()))
			return [{ background: '#FAC100' }, 'tomorrow'];

		if (isBefore(day, today)) return [{ display: 'none' }, null];

		if (props.eventsDays.includes(day.getDate())) return [{ background: '#00CA80' }, 'hasEvent'];

		return [{ visibility: 'hidden' }, null];
	};

	const renderDay = (day) => {
		const dates = day.getDate();
		const time = day.getTime();
		const today = new Date();

		const dateStyle =
			isSameDay(day, today) || today.getTime() < time
				? {
						color: '#000',
				  }
				: {
						color: '#E2EBFC',
				  };

		const dateCellStyle = {
			width: 38,
			padding: '4px 0',
		};

		const circleStyle = getStyleAndClass(day, today)[0];

		return (
			<div style={dateCellStyle} className={getStyleAndClass(day, today)[1]}>
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

	const eventBox = (event, type) => {
		return (
			<div
				key={event.id}
				style={
					props.highlightedDate === new Date(event.date).getDate()
						? { backgroundColor: '#EDEEF1' }
						: {}
				}
				className={classes.eventsInnerWrapper}
			>
				<div
					style={{ backgroundColor: compareDates(new Date(event.date)).color }}
					className={classes.eventsLabel}
				>
					<div
						className={classes.markboxWrapper}
						onClick={() => props.handleMarkEvent(event.id, type)}
					>
						{type === 'upcoming' && (
							<div className={classes.markBox}>
								<BookmarkIcon className={classes.bookmarkIcon} />
								<span className={classes.addSpan}>Mark Event</span>
							</div>
						)}
						{type === 'marked' && (
							<div className={classes.markBox}>
								<UnmarkIcon className={classes.bookmarkIcon} />
								<span className={classes.addSpan}>Unmark Event</span>
							</div>
						)}
					</div>
				</div>
				<div className={classes.eventsContentWrapper}>
					<div className={classes.eventsInnerContentWrapper}>
						<div className={classes.eventsHeader}>
							{/* <BookmarkIcon className={classes.miniBookmark} /> */}
							{formatLongString(event.title, 22)}
						</div>
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
							Location to be published
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
	};

	return (
		<main className={classes.mainWrapper}>
			<Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
				<Grid container justifyContent="space-between" style={{ marginBottom: '20px' }}>
					<Grid item xs={5.9} lg={4.9}>
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
										marginTop: 26,
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
												onClick={() => props.handleClick(pub.id, pub.categories)}
											>
												{pub.title}
											</div>
									  ))
									: null}
							</Carousel>
						</section>
					</Grid>
					{/* most clicked */}
					<Grid item xs={5.9} lg={6.9}>
						<section className={classes.mostClickedIdeasBox}>
							<div className={classes.header}>Most Clicked Ideas</div>
							<div className={classes.horizontalScrollWrapper}>
								{props.mostClickedIdeas.length
									? props.mostClickedIdeas.map((pub) => mostClickedIdeasSection(pub))
									: null}
							</div>
						</section>
					</Grid>
				</Grid>
				{/* last pubs, latest news, morning notes */}
				<Grid container justifyContent="space-between" style={{ marginBottom: '16px' }}>
					<Grid item xs={4.2} xl={3.5} className={classes.column}>
						<section className={classes.lastPublications}>
							<div
								style={{
									fontWeight: 700,
									marginBottom: '10px',
								}}
							>
								Last Publications
							</div>
							<TabsUnstyled
								value={props.lastPublicationsTabValue}
								onChange={props.handleLastPublicationTabChange}
							>
								<TabsList className={`${classes.lastPublicationsTabsList}`}>
									<Tab value="Asia-Pacific">Asia-Pacific</Tab>
									<Tab value="Europe">Europe</Tab>
									<Tab value="United-States">United-States</Tab>
								</TabsList>

								<TabPanel value="Asia-Pacific">
									{props.lastPublications.length
										? props.lastPublications
												.filter((pub) => pub.region === 'Asia-Pacific')
												.map((pub) => lastPublicationsSection(pub))
										: null}
								</TabPanel>
								<TabPanel value="Europe">
									{props.lastPublications.length
										? props.lastPublications
												.filter((pub) => pub.region === 'Europe')
												.map((pub) => lastPublicationsSection(pub))
										: null}
								</TabPanel>
								<TabPanel value="United-States">
									{props.lastPublications.length
										? props.lastPublications
												.filter((pub) => pub.region === 'United-States')
												.map((pub) => lastPublicationsSection(pub))
										: null}
								</TabPanel>
								{/* </TabContext> */}
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
							<TabsUnstyled
								value={props.morningNotesTabValue}
								onChange={props.handleMorningNotsTabChange}
							>
								<TabsList>
									<Tab value="Asia-Pacific">Asia-Pacific</Tab>
									<Tab value="Europe">Europe</Tab>
									<Tab value="United-States">United-States</Tab>
								</TabsList>
								<TabPanel value="Asia-Pacific">
									<div className={classes.morningNotesScroll}>
										{props.morningNotes.length
											? props.morningNotes
													.filter((pub) => pub.region === 'Asia-Pacific')
													.map((pub) => morningNotesSection(pub))
											: null}
									</div>
								</TabPanel>
								<TabPanel value="Europe">
									<div className={classes.morningNotesScroll}>
										{props.morningNotes.length
											? props.morningNotes
													.filter((pub) => pub.region === 'Europe')
													.map((pub) => morningNotesSection(pub))
											: null}
									</div>
								</TabPanel>
								<TabPanel value="United-States">
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
					<Grid item xs={3.8} xl={4.7} className={classes.column}>
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
					<Grid item xs={3.8} xl={3.5} className={classes.column}>
						<section className={classes.events}>
							<div
								style={{
									fontWeight: 700,
									marginBottom: '10px',
								}}
							>
								Events
							</div>
							<TabsUnstyled
								value={props.eventsTabValue}
								className={classes.TabsUnstyled}
								onChange={props.handleEventsTabChange}
							>
								{props.isAuthenticated && (
									<TabsList className={classes.tablist}>
										<Tab value="upcoming">Upcoming</Tab>
										<Tab
											value="marked"
											onClick={() => {
												props.fetchEventsByMonth(true);
											}}
										>
											Marked
										</Tab>
									</TabsList>
								)}
								{/* style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} */}
								<TabPanel
									value="upcoming"
									style={{ display: 'flex', flexDirection: 'column' }}
								>
									<div style={{ borderBottom: '2px solid #EDEDF0', paddingBottom: 16 }}>
										<Helmet>
											<style>{dayPickerStyle}</style>
										</Helmet>
										<DayPicker
											renderDay={renderDay}
											selectedDays={props.selectedDay}
											onDayClick={props.setSelectedDay}
											onDayMouseEnter={(date) => props.handleDayMouse(date, 'enter')}
											onDayMouseLeave={(date) => props.handleDayMouse(date, 'leave')}
											onMonthChange={(month) => {
												props.setDate(month);
											}}
										/>
									</div>
									<section className={classes.eventsWrapper}>
										{props.events?.length
											? props.events
													.filter(
														(event) =>
															new Date(event.date).getDate() >=
															new Date().getDate(),
													)
													.map((event) => eventBox(event, 'upcoming'))
											: null}
									</section>
								</TabPanel>
								<TabPanel value="marked">
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
											? props.events
													.filter(
														(event) =>
															new Date(event.date).getDate() >=
															new Date().getDate(),
													)
													.map((event) => eventBox(event, 'marked'))
											: null}
									</section>
								</TabPanel>
							</TabsUnstyled>
						</section>
					</Grid>
				</Grid>
			</Grid>
			<MessageAlert
				open={props.openAlert}
				handleClose={props.handleClose}
				title={props.title}
				text={props.text}
				actionName={props.actionName}
				handleAction={props.handleAction}
			/>
		</main>
	);
};

GeneralHomeView.displayName = 'MemberHomeView';
GeneralHomeView.defaultProps = {};

export default React.memo(GeneralHomeView);
