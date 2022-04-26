import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import { setParamsAuthorPublication } from '../../../../../utils/helpers/helperFunctions';
import AllPublicationsTabsView from './AllPublicationsTabs.view';

const AllPublicationsTabs = (props) => {
	const [value, setValue] = useState(0);
	const [drafts, setDrafts] = useState([]);
	const [published, setPublished] = useState([]);
	const [categoriesSelect, setCategoriesSelect] = useState([]);
	const [openNewPublication, setOpenNewPublication] = useState(false);
	const [limit, setLimit] = useState(30);
	const [offset, setOffset] = useState(0);

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

	const fetchPublications = useCallback(async () => {
		const token = localStorage.getItem('token');

		try {
			const resPublished = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`, {
				...setParamsAuthorPublication(0, 30, 'published', categoriesSelect[0]?.id),
				headers: { Authorization: token },
			});

			const resDrafts = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`, {
				...setParamsAuthorPublication(0, 30, 'draft', categoriesSelect[0]?.id),
				headers: { Authorization: token },
			});

			if (resPublished.status === 200) {
				setPublished(resPublished.data.publications);
			}

			if (resDrafts.status === 200) {
				setDrafts(resDrafts.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	useEffect(() => {
		fetchPublications();
	}, [categoriesSelect]);

	const handleChange = useCallback((event, newValue) => {
		setValue(newValue);
	});

	return (
		<AllPublicationsTabsView
			published={published}
			drafts={drafts}
			value={value}
			handleChange={handleChange}
			handleOpenNewPublication={handleOpenNewPublication}
			handleCloseNewPublication={handleCloseNewPublication}
			fetchPublications={fetchPublications}
			fetchStatistics={props.fetchStatistics}
			openNewPublication={openNewPublication}
			handler={handleCategoriesSelect}
			formObject={categoriesSelect}
			setFormObject={setCategoriesSelect}
			limit={limit}
			setLimit={setLimit}
			offset={offset}
			setOffset={setOffset}
		/>
	);
};

AllPublicationsTabs.displayName = 'AllPublicationsTabs';

AllPublicationsTabs.defaultProps = {};

export default React.memo(AllPublicationsTabs);
