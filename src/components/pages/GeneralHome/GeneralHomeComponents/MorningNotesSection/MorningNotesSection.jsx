import React, { useState, useEffect } from 'react';
import MorningNotesSectionView from './MorningNotesSection.view';

const MorningNotesSection = (props) => {
	const morningNotesId = props.categories?.find((categoryObj) => categoryObj.name === 'Morning Notes')?.id;
	const [morningNotes, setMorningNotes] = useState([]);
	const [morningNotesTabValue, setMorningNotesTabValue] = useState('Asia-Pacific');

	const handleMorningNotsTabChange = (e, newValue) => {
		setMorningNotesTabValue(newValue);
	};

	useEffect(() => {
		props.categories.length &&
			morningNotesId &&
			props.fetchByCategory(5, morningNotesId, setMorningNotes, null, morningNotesTabValue);
	}, [props.categories, morningNotesTabValue]);

	return (
		<MorningNotesSectionView
			categories={props.categories}
			morningNotesTabValue={morningNotesTabValue}
			morningNotes={morningNotes}
			formatLongString={props.formatLongString}
			handleClick={props.handleClick}
			handleMorningNotsTabChange={handleMorningNotsTabChange}
		/>
	);
};

MorningNotesSection.displayName = 'MorningNotesSection';
MorningNotesSection.defaultProps = {};

export default React.memo(MorningNotesSection);
