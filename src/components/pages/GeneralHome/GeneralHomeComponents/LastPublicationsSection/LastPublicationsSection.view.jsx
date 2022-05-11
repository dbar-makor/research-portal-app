import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { format } from 'date-fns';

import { Tab, TabPanel, TabsList } from '../../GeneralHome.style';

import useStyles from './LastPublicationsSection.style';

const LastPublicationsSectionView = (props) => {
	const classes = useStyles();

	const lastPublicationsSection = (pub) => (
		<section
			key={pub.id}
			className={classes.lastPublicationsWrapper}
			onClick={() => props.handleClick(pub.id, pub.categories)}
		>
			<div className={classes.lastPublicationsTopRow}>
				<div className={classes.lastPublicationsTitle} style={{ flex: '80%' }}>
					{props.formatLongString(pub.title, 38)}
				</div>
				<div className={classes.lastPublicationsTitle} style={{ flex: '20%' }}>
					{format(new Date(pub.updated_at), 'dd/MM/yyyy')}
				</div>
			</div>
			<div>
				<div className={classes.lastPublicationsContent}>
					{props.formatLongString(pub.description, 60)}
				</div>
			</div>
		</section>
	);

	return (
		<TabsUnstyled value={props.lastPublicationsTabValue} onChange={props.handleLastPublicationTabChange}>
			<TabsList className={`${classes.lastPublicationsTabsList}`}>
				<Tab value="Asia-Pacific">Asia-Pacific</Tab>
				<Tab value="Europe">Europe</Tab>
				<Tab value="United-States">United-States</Tab>
			</TabsList>

			<TabPanel value="Asia-Pacific">
				{props.lastPublications?.length
					? props.lastPublications
							.filter((pub) => pub.region === 'Asia-Pacific')
							.map((pub) => lastPublicationsSection(pub))
					: null}
			</TabPanel>
			<TabPanel value="Europe">
				{props.lastPublications?.length
					? props.lastPublications
							.filter((pub) => pub.region === 'Europe')
							.map((pub) => lastPublicationsSection(pub))
					: null}
			</TabPanel>
			<TabPanel value="United-States">
				{props.lastPublications?.length
					? props.lastPublications
							.filter((pub) => pub.region === 'United-States')
							.map((pub) => lastPublicationsSection(pub))
					: null}
			</TabPanel>
		</TabsUnstyled>
	);
};

LastPublicationsSectionView.displayName = 'LastPublicationsSectionView';
LastPublicationsSectionView.defaultProps = {};

export default React.memo(LastPublicationsSectionView);
