import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { validateMember } from '../../../../utils/helpers/validationFunctions';
import * as utilsAction from '../../../../redux/utils/utilsSlice';

import CategoriesAutoCompleteView from './CategoriesAutoComplete.view';

const CategoriesAutoComplete = (props) => {
	const dispatch = useDispatch();
	const label = props.label ? props.label : '';
	const className = props.className ? props.className : '';
	const error = props.error ? props.error : null;
	const errors = props.errors ? props.errors : null;
	const setErrors = props.setErrors ? props.setErrors : () => {};
	const setValidationResult = props.setValidationResult ? props.setValidationResult : () => {};
	const setParentArr = props.setParentArr ? props.setParentArr : () => {};
	const parentArr = props.parentArr ? props.parentArr : null;
	const chipVariant = props.chipVariant ? props.chipVariant : 'outlined';
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const itemIndex =
		parentArr && parentArr.length && parentArr.findIndex((item) => item.id === props.formObject.id);

	//always an arr:
	const adjustedFormObject = props.formObject.categories ? props.formObject.categories : props.formObject;

	const deleteItem = (index) => {
		const categoryCopy = [...adjustedFormObject];

		categoryCopy.splice(index, 1);
		const formObjectCopy = { ...props.formObject, categories: categoryCopy };

		props.setFormObject(formObjectCopy);

		//For live/dead publication only (saving to storage)
		if (props.type === 'live_publication' || props.type === 'dead_publication') {
			const articleId = sessionStorage.getItem('articleId');
			const deadArticleId = sessionStorage.getItem('deadArticleId');
			// Check if not in edit mode

			if (!articleId && props.type === 'live_publication') {
				// Update categories in localStorage
				localStorage.setItem('categories', JSON.stringify(categoryCopy));
			}

			// Check if not in dead article edit mode
			if (!deadArticleId && props.type === 'dead_publication') {
				// Update dead article categories in localStorage
				localStorage.setItem('deadArticleCategories', JSON.stringify(categoryCopy));
			}
		}

		if (parentArr?.length) {
			const parentArrCopy = [...parentArr];

			parentArrCopy.splice(itemIndex, 1, formObjectCopy);
			setParentArr(parentArrCopy);
		}

		errors && validateMember({ categories: categoryCopy }, errors, setErrors, setValidationResult);
	};

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(utilsAction.getUtilsAsync());
		}
	}, []);

	return (
		<CategoriesAutoCompleteView
			label={label}
			className={className}
			handler={props.handler}
			formObject={props.formObject}
			error={error}
			adjustedFormObject={adjustedFormObject}
			chipVariant={chipVariant}
			deleteItem={deleteItem}
		/>
	);
};

CategoriesAutoComplete.displayName = 'CategoriesAutoComplete';
CategoriesAutoComplete.defaultProps = {};

export default React.memo(CategoriesAutoComplete);
