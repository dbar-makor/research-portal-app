import React from 'react';

import TagsAutoCompleteView from './TagsAutoComplete.view';

const TagsAutoComplete = (props) => {
	const className = props.className ? props.className : '';
	const label = props.label ? props.label : '';
	const error = props.error ? props.error : null;
	const chipVariant = props.chipVariant ? props.chipVariant : 'outlined';

	const articleId = sessionStorage.getItem('articleId');
	const deadArticleId = sessionStorage.getItem('deadArticleId');

	const deleteItem = async (index) => {
		const tagsCopy = [...props.formObject];

		await tagsCopy.splice(index, 1);

		// Check if not in edit mode
		if (!articleId) {
			// Update categories in localStorage
			localStorage.setItem('tags', JSON.stringify(tagsCopy));
		}

		// Check if not in dead article edit mode
		if (!deadArticleId) {
			// Update dead article categories in localStorage
			localStorage.setItem('deadArticleTags', JSON.stringify(tagsCopy));
		}

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
