import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';

import AllPublicationsTabsView from './AllPublicationsTabs.view';

const AllPublicationsTabs = (props) => {
	const [value, setValue] = useState(0);
	const [publications, setPublications] = useState([]);
	const [filteredPublications, setFilteredPublications] = useState([]);
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
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`);

			if (res.status === 200) {
				setPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	useEffect(() => {
		fetchPublications();
	}, []);

	useEffect(() => {
		if (categoriesSelect.length) {
			setFilteredPublications(() =>
				publications.filter((p) =>
					p.categories.some((c) => {
						return c.name === categoriesSelect[0].name;
					}),
				),
			);
		}
	}, [categoriesSelect]);
	const handleChange = useCallback((event, newValue) => {
		setValue(newValue);
	});

	return (
		<AllPublicationsTabsView
			publications={categoriesSelect.length ? filteredPublications : publications}
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
