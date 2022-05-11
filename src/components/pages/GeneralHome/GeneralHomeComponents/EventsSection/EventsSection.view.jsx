import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { format } from 'date-fns';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Helmet } from 'react-helmet';
import DayPicker from 'react-day-picker';
import { Tab, TabPanel, TabsList, dayPickerStyle } from '../../GeneralHome.style';
import { ReactComponent as UnmarkIcon } from '../../../../../assets/icons/unmark.svg';
import useStyles from './EventsSection.style';

const EventsSectionView = (props) => {
	const classes = useStyles(props);

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
							{props.formatLongString(event.title, 22)}
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
			<TabPanel value="upcoming" style={{ display: 'flex', flexDirection: 'column' }}>
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
								.filter((event) => new Date(event.date).getDate() >= new Date().getDate())
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
								.filter((event) => new Date(event.date).getDate() >= new Date().getDate())
								.map((event) => eventBox(event, 'marked'))
						: null}
				</section>
			</TabPanel>
		</TabsUnstyled>
	);
};

EventsSectionView.displayName = 'EventsSectionView';
EventsSectionView.defaultProps = {};

export default React.memo(EventsSectionView);
