import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import TabContext from '@material-ui/lab/TabContext';
// import TabsListUnstyled from '@mui/base/TabsListUnstyled';
// import TabsUnstyled from '@mui/base/TabsUnstyled';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import PublicationsTab from '../PublicationsTab/PublicationsTab';
import TabPanel from '../TabPanel/TabPanel';
import { AddButton } from '../../../../../styles/MainStyles';
import AuthorsNewArticleModal from '../../AuthorsNewArticleModal/AuthorsNewArticleModal';
import CategoriesAutoComplete from '../../../reusables/CategoriesAutoComplete/CategoriesAutoComplete';
import Pagination from '../../../reusables/Pagination/Pagination';
import useStyles from './AllPublicationsTabs.style';

function a11yProps(index) {
	return {
		'id': `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const AllPublicationsTabsView = (props) => {
	const classes = useStyles();
	const publishedResearches = props.published;
	const draftResearches = props.drafts;

	return (
		<div className={classes.root}>
			{/* <TabContext value={props.tabValue}> */}
			{/* <TabsUnstyled value={props.tabValue} onChange={props.handleTabChange}> */}
			<Grid item xs={12}>
				<Grid item container xs={12} justifyContent="space-between" className={classes.barWrapper}>
					<Grid item xs={12} md={4}>
						<Tabs
							className={classes.tabs}
							aria-label="tabs"
							value={props.tabValue}
							onChange={props.handleTabChange}
						>
							<Tab label="Published" {...a11yProps(0)} className={classes.tab} />
							<Tab label="Drafts" {...a11yProps(1)} className={classes.tab} />
						</Tabs>
					</Grid>
					<Grid
						container
						item
						xs={12}
						md={7}
						justifyContent="flex-end"
						className={classes.rightBarWrapper}
					>
						<Grid item xs={5} md={6} lg={7} className={classes.categoriesWrapper}>
							<CategoriesAutoComplete
								notMultiple
								handler={props.handler}
								formObject={props.formObject}
								setFormObject={props.setFormObject}
								noChips
								search
							/>
						</Grid>
						<Grid container item xs={3} md={4} lg={3} justifyContent="flex-end">
							<AddButton
								className={classes.newBtn}
								onClick={() => props.handleOpenNewPublication()}
							>
								<AddIcon fontSize="small" />
								New
							</AddButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container xs={12}>
					<TabPanel value={props.tabValue} index={0} className={classes.tabPanel}>
						{publishedResearches.length ? (
							publishedResearches.map((pub, idx) => {
								return (
									<PublicationsTab
										key={`${pub.title}${idx}`}
										publication={pub}
										fetchPublications={props.fetchPublications}
										fetchStatistics={props.fetchStatistics}
									/>
								);
							})
						) : (
							<Typography className={classes.noPublications}>
								No published publications yet
							</Typography>
						)}
						{props.publishedAllPages > 1 ? (
							<Pagination
								currentPage={props.publishedPage}
								setCurrentPage={props.setPublishedPage}
								allPages={props.publishedAllPages}
							/>
						) : null}
					</TabPanel>
					<TabPanel value={props.tabValue} index={1} className={classes.tabPanel}>
						{draftResearches.length ? (
							draftResearches.map((pub, idx) => {
								return (
									<PublicationsTab
										key={`${pub.title}${idx}`}
										publication={pub}
										fetchPublications={props.fetchPublications}
										fetchStatistics={props.fetchStatistics}
									/>
								);
							})
						) : (
							<Typography className={classes.noPublications}>No drafts yet</Typography>
						)}
						{props.draftsAllPages > 1 ? (
							<Pagination
								currentPage={props.draftsPage}
								setCurrentPage={props.setDraftsPage}
								allPages={props.draftsAllPages}
							/>
						) : null}
					</TabPanel>
				</Grid>
			</Grid>
			{/* </TabsUnstyled> */}
			<AuthorsNewArticleModal
				handleClose={props.handleCloseNewPublication}
				open={props.openNewPublication}
			/>
		</div>
	);
};

AllPublicationsTabsView.displayName = 'AllPublicationsTabsView';
AllPublicationsTabsView.defaultProps = {};

export default React.memo(AllPublicationsTabsView);
