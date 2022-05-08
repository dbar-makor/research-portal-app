import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { setParamsAuthorPublication } from '../../../../../utils/helpers/helperFunctions';
import AllPublicationsTabsView from './AllPublicationsTabs.view';

const AllPublicationsTabs = (props) => {
	const [drafts, setDrafts] = useState([]);
	// const [hasMoreDrafts, setHasMoreDrafts] = useState(false);
	const [draftsMetaData, setDraftsMetaData] = useState({});
	const [draftsPage, setDraftsPage] = useState(1);
	// eslint-disable-next-line no-unused-vars
	//const [draftsOffset, setdraftsOffset] = useState(0);
	const [published, setPublished] = useState([]);
	// const [hasMorePublished, setHasMorePublished] = useState(false);
	const [publishedMetaData, setPublishedMetaData] = useState({});
	const [publishedPage, setPublishedPage] = useState(1);
	// eslint-disable-next-line no-unused-vars
	//const [publishedOffset, setpublishedOffset] = useState(0);
	const [categoriesSelect, setCategoriesSelect] = useState([]);
	const [openNewPublication, setOpenNewPublication] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	// const [limit, setLimit] = useState(30);
	// const [offset, setOffset] = useState(0);

	const handleCloseNewPublication = useCallback(() => {
		setOpenNewPublication(false);
	});

	const handleCategoriesSelect = useCallback((category) => {
		if (!category) {
			setCategoriesSelect([]);

			return;
		}

		setCategoriesSelect([category]);
	});

	const handleOpenNewPublication = useCallback(() => {
		setOpenNewPublication(true);
	});

	const fetchPublishedPublications = useCallback(async () => {
		const token = localStorage.getItem('token');

		try {
			const resPublished = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`, {
				...setParamsAuthorPublication(
					(publishedPage - 1) * 30,
					30,
					'published',
					categoriesSelect[0]?.id,
				),
				headers: { Authorization: token },
			});

			if (resPublished.status === 200) {
				setPublished(resPublished.data.publications);
				setPublishedMetaData(resPublished.data.meta_data);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	const fetchDraftPublications = useCallback(async () => {
		const token = localStorage.getItem('token');

		try {
			const resDrafts = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`, {
				...setParamsAuthorPublication((draftsPage - 1) * 30, 30, 'draft', categoriesSelect[0]?.id),
				headers: { Authorization: token },
			});

			if (resDrafts.status === 200) {
				setDrafts(resDrafts.data.publications);
				setDraftsMetaData(resDrafts.data.meta_data);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	// On page load, fetch only published publications, then on any tab change fetch the corresponding publications
	useEffect(() => {
		if (tabValue === 0) {
			fetchPublishedPublications();
		} else {
			fetchDraftPublications();
		}
	}, [tabValue, categoriesSelect, draftsPage, publishedPage]);

	const handleTabChange = useCallback((event, newValue) => {
		setTabValue(newValue);
	});

	return (
		<AllPublicationsTabsView
			published={published}
			drafts={drafts}
			handleOpenNewPublication={handleOpenNewPublication}
			handleCloseNewPublication={handleCloseNewPublication}
			fetchStatistics={props.fetchStatistics}
			openNewPublication={openNewPublication}
			handler={handleCategoriesSelect}
			formObject={categoriesSelect}
			setFormObject={setCategoriesSelect}
			draftsAllPages={draftsMetaData?.sum_pages}
			publishedAllPages={publishedMetaData?.sum_pages}
			draftsPage={draftsPage}
			publishedPage={publishedPage}
			setPublishedPage={setPublishedPage}
			setDraftsPage={setDraftsPage}
			tabValue={tabValue}
			handleTabChange={handleTabChange}
		/>
	);
};

AllPublicationsTabs.displayName = 'AllPublicationsTabs';

AllPublicationsTabs.defaultProps = {};

export default React.memo(AllPublicationsTabs);
