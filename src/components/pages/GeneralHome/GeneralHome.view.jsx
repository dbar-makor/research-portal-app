import React from 'react';
import Grid from '@mui/material/Grid';
import 'react-day-picker/lib/style.css';
import MessageAlert from '../../ui/reusables/MessageAlert/MessageAlert';
import useStyles from './GeneralHome.style';
import CarouselSection from './GeneralHomeComponents/CarouselSection/CarouselSection';
import MostClickedIdeasSection from './GeneralHomeComponents/MostClickedIdeasSection/MostClickedIdeasSection';
import LastPublicationsSection from './GeneralHomeComponents/lastPublicationsSection/LastPublicationsSection';
import LatestNewsSection from './GeneralHomeComponents/LatestNewsSection/LatestNewsSection';
import MorningNotesSection from './GeneralHomeComponents/MorningNotesSection/MorningNotesSection';
import IndustryRecoursedSection from './GeneralHomeComponents/IndustryRecoursedSection/IndustryRecoursedSection';
import FocusIdeasSection from './GeneralHomeComponents/FocusIdeasSection/FocusIdeasSection';
import EventsSection from './GeneralHomeComponents/EventsSection/EventsSection';

const x = 1;

console.log(x);

const formatLongString = (str, lgth) => {
	if (str.length > 35) {
		return `${str.substring(0, lgth)}...`;
	} else {
		return str;
	}
};

const GeneralHomeView = (props) => {
	const classes = useStyles(props);

	return (
		<main className={classes.mainWrapper}>
			<Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
				<Grid container justifyContent="space-between" style={{ marginBottom: '20px' }}>
					<Grid item xs={5.9} lg={4.9}>
						<section className={classes.carousel}>
							<div className={classes.header}>Featured</div>
							<CarouselSection
								categories={props.categories}
								handleClick={props.handleClick}
								fetchByCategory={props.fetchByCategory}
							/>
						</section>
					</Grid>
					{/* most clicked */}
					<Grid item xs={5.9} lg={6.9}>
						<section className={classes.mostClickedIdeasBox}>
							<div className={classes.header}>Most Clicked Ideas</div>
							<div className={classes.horizontalScrollWrapper}>
								<MostClickedIdeasSection
									categories={props.categories}
									handleClick={props.handleClick}
									fetchByCategory={props.fetchByCategory}
									formatLongString={formatLongString}
								/>
							</div>
						</section>
					</Grid>
				</Grid>
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
							<LastPublicationsSection
								categories={props.categories}
								handleClick={props.handleClick}
								formatLongString={formatLongString}
							/>
						</section>
						<section className={classes.latestNews}>
							<div className={`${classes.header} ${classes.headerScrolled}`}>Latest News</div>
							<div className={classes.latestNewsScroll}>
								<LatestNewsSection
									categories={props.categories}
									handleClick={props.handleClick}
									fetchByCategory={props.fetchByCategory}
									formatLongString={formatLongString}
								/>
							</div>
						</section>
						<section className={classes.morningNotes}>
							<div className={classes.header} style={{ marginBottom: '10px' }}>
								Morning Notes
							</div>
							<MorningNotesSection
								categories={props.categories}
								handleClick={props.handleClick}
								fetchByCategory={props.fetchByCategory}
								formatLongString={formatLongString}
							/>
						</section>
					</Grid>
					<Grid item xs={3.8} xl={4.7} className={classes.column}>
						<section className={classes.industryRecoursed}>
							<div className={classes.header}>Industry Recoursed</div>
							<IndustryRecoursedSection
								categories={props.categories}
								handleClick={props.handleClick}
								fetchByCategory={props.fetchByCategory}
							/>
						</section>
						<section className={classes.focusIdeas}>
							<div className={`${classes.header} ${classes.headerScrolled}`}>Focus Ideas</div>
							<div className={classes.focusIdeasScroll}>
								<FocusIdeasSection
									categories={props.categories}
									handleClick={props.handleClick}
									fetchByCategory={props.fetchByCategory}
									formatLongString={formatLongString}
								/>
								<FocusIdeasSection
									categories={props.categories}
									handleClick={props.handleClick}
									fetchByCategory={props.fetchByCategory}
									formatLongString={formatLongString}
								/>
							</div>
						</section>
					</Grid>
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
							<EventsSection
								style={{ marginBottom: 16 }}
								formatLongString={formatLongString}
								isAuthenticated={props.isAuthenticated}
								onClick={props.handleClick}
							/>
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
