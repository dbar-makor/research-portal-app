import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setParamsPublication } from '../../../../../utils/helpers/helperFunctions';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import LastPublicationsSectionView from './LastPublicationsSection.view';

const LastPublicationsSection = (props) => {
	const [lastPublications, setLastPublications] = useState([]);
	const [lastPublicationsTabValue, setLastPublicationsTabValue] = useState('Asia-Pacific');

	const fetchLastPublications = async (howMany, region) => {
		try {
			const res = await axios.get(
				`${BASE_URL}${END_POINT.PUBLICATION}`,
				setParamsPublication(0, howMany, null, null, region),
			);

			if (res.status === 200) {
				setLastPublications(res.data.publications);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	};

	const handleLastPublicationTabChange = (e, newValue) => {
		setLastPublicationsTabValue(newValue);
	};

	useEffect(() => {
		fetchLastPublications(3, lastPublicationsTabValue);
	}, [lastPublicationsTabValue]);

	return (
		<LastPublicationsSectionView
			lastPublications={lastPublications}
			handleClick={props.handleClick}
			formatLongString={props.formatLongString}
			lastPublicationsTabValue={lastPublicationsTabValue}
			handleLastPublicationTabChange={handleLastPublicationTabChange}
		/>
	);
};

LastPublicationsSection.displayName = 'LastPublicationsSection';
LastPublicationsSection.defaultProps = {};

export default React.memo(LastPublicationsSection);
