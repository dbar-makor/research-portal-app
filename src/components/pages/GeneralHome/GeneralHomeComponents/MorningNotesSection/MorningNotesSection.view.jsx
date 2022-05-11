import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { format } from 'date-fns';
import { Tab, TabPanel, TabsList } from '../../GeneralHome.style';
import useStyles from './MorningNotesSection.style';

const MorningNotesSectionView = (props) => {
	const classes = useStyles();

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
				<div className={classes.morningNotesContent}>{props.formatLongString(pub.title, 30)}</div>
				<div className={classes.morningNotesDate}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
		</section>
	);

	return (
		<TabsUnstyled value={props.morningNotesTabValue} onChange={props.handleMorningNotsTabChange}>
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
	);
};

MorningNotesSectionView.displayName = 'MorningNotesSectionView';
MorningNotesSectionView.defaultProps = {};

export default React.memo(MorningNotesSectionView);
