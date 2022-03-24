import React from 'react';

import TagsAutoCompleteView from './TagsAutoComplete.view';

const TagsAutoComplete = (props) => {
	const className = props.className ? props.className : '';
	const label = props.label ? props.label : '';
	const error = props.error ? props.error : null;
	const chipVariant = props.chipVariant ? props.chipVariant : 'outlined';

	const deleteItem = (index) => {
		const tagsCopy = [...props.formObject];

		tagsCopy.splice(index, 1);
		props.setFormObject(tagsCopy);
	};

	return (
		<TagsAutoCompleteView
			deleteItem={deleteItem}
			className={className}
			label={label}
			formObject={props.formObject}
			error={error}
			handler={props.handler}
			chipVariant={chipVariant}
		/>
	);
};

TagsAutoComplete.displayName = 'TagsAutoComplete';
TagsAutoComplete.defaultProps = {};

export default React.memo(TagsAutoComplete);
