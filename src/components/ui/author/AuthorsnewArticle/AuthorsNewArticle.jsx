import React, { useState, useEffect, useRef } from 'react';
import { convertToRaw } from 'draft-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { isValid } from 'date-fns';
import { useHistory, useLocation } from 'react-router';
import {
	getChosenResearchAsync,
	selectChosenResearch,
	changeChosenResearch,
} from '../../../../redux/researches/chosenResearchSlice';
import { END_POINT, BASE_URL } from '../../../../utils/constants';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import {
	validateLivePublication,
	validateEvent,
	validateEditedLivePublication,
} from '../../../../utils/helpers/validationFunctions';
import AuthorsNewArticleView from './AuthorsNewArticle.view';

const getArticleId = () => {
	const id = sessionStorage.getItem('articleId');

	if (!id || id === 'undefined') return '';

	return id;
};

const clearStorage = () => {
	localStorage.removeItem('article');
	localStorage.removeItem('coverImage');
	localStorage.removeItem('categories');
	localStorage.removeItem('tags');
	localStorage.removeItem('presentation-article');
	sessionStorage.removeItem('articleId');
};

const processContent = (content) => {
	let editedContent;

	if (typeof content === 'string') {
		//if there is no real content - send empty object;
		if (!content) return {};

		editedContent = JSON.parse(content);
		//if there is no real content - send empty object;

		if (Object.values(editedContent)[0].some((block) => block.text !== '')) {
			return editedContent;
		} else {
			return {};
		}
	}

	if (typeof content === 'object') {
		//if object is empty

		if (Object.values(content).length < 1) return {};

		//if object isn't empty but does not have real content

		if (Object.values(content)[0].some((block) => block.text !== '')) {
			return content;
		} else {
			return {};
		}
	}
};

const AuthorsNewArticle = () => {
	const chosenResearch = useSelector(selectChosenResearch);

	// Check if edit mode
	const [articleId, setArticleId] = useState(getArticleId());

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [description, setDescription] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	//navigation outside page with unsaved changes is blocked in useEffect
	const [navigationAllowed, setNavigationAllowed] = useState(false);
	//state keeps the location the user wanted to navigate to without saving changes
	const [requestedLocation, setRequestedLocation] = useState('');
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [isPublishable, setIsPublishable] = useState(false);

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	const [errorsEvent, setErrorsEvent] = useState({});
	/* eslint no-unused-vars: 0 */
	const [validationResultEvent, setValidationResultEvent] = useState(true);

	const [coverImageOK, setCoverImageOK] = useState({ initial: true, final: false });
	const [contentNotOK, setContentNotOK] = useState({ focus: false, isText: false, everTyped: false });
	const showEditorError = contentNotOK.focus && contentNotOK.everTyped && !contentNotOK.isText;

	const [currentEvent, setCurrentEvent] = useState({
		date: null,
		title: '',
	});

	const formInitState = {
		title: '',
		content: '',
		categories: [],
		attachments: [],
		events: [],
		tags: [],
		type: 'live',
	};

	const [localForm, setLocalForm] = useState(() => {
		// Check for article ID exsistence in sessionStorage
		if (articleId) dispatch(getChosenResearchAsync(articleId));

		// Get article from localStorage
		const localStorageArticle = localStorage.getItem('article');

		// Check for article in localStorage or article is in edit mode
		if (!localStorageArticle || localStorageArticle === 'undefined' || chosenResearch) {
			return formInitState;
		}

		const article = JSON.parse(localStorageArticle);
		//validating title from localStorage

		validateEditedLivePublication({ title: article.title }, errors, setErrors, setValidationResult);

		return article;
	});

	const [storageDefaultContent, setStorageDefaultContent] = useState({});

	const [coverImage, setCoverImage] = useState(() => {
		// Get cover image from localStorage
		const localStorageCoverImage = localStorage.getItem('coverImage');

		// Check for cover image in localStorage or article is in edit mode
		if (!localStorageCoverImage || localStorageCoverImage === 'undefined' || chosenResearch) return '';

		const coverImage = JSON.parse(localStorageCoverImage);

		setCoverImageOK((prev) => ({ initial: true, final: true }));

		return coverImage;
	});

	const [localCats, setLocalCats] = useState(() => {
		// Get cover image from localStorage
		const localStorageCategories = localStorage.getItem('categories');

		// Check for categories in localStorage or article is in edit mode
		if (!localStorageCategories || localStorageCategories === 'undefined' || chosenResearch) return [];

		const categories = JSON.parse(localStorageCategories);

		validateEditedLivePublication({ categories: categories }, errors, setErrors, setValidationResult);

		return categories;
	});

	const [localTags, setLocalTags] = useState(() => {
		// Get tags from localStorage
		const localStorageTags = localStorage.getItem('tags');

		// Check for tags in localStorage or article is in edit mode
		if (!localStorageTags || localStorageTags === 'undefined' || chosenResearch) return [];

		const tags = JSON.parse(localStorageTags);

		return tags;
	});

	const [scrollLocation, setScrollLocation] = useState('bottom');
	const tableRowsRefs = useRef([]);

	// Save article in localStorage
	const setLocalStorageArticle = (data) => {
		if (chosenResearch || articleId) return;

		localStorage.setItem('article', JSON.stringify(data));
	};

	const executeScroll = () => {
		if (localForm.events.length) {
			const lastIndex = tableRowsRefs.current.length - 1;

			if (scrollLocation === 'bottom') {
				tableRowsRefs.current[lastIndex].scrollIntoView();
			}
		}
	};

	//is_publishable
	useEffect(() => {
		if (validationResult && validationResultEvent && coverImageOK.final && contentNotOK.isText)
			setIsPublishable(true);
		else {
			setIsPublishable(false);
		}
	}, [validationResult, validationResultEvent, coverImageOK, contentNotOK]);

	// Editing Mode
	useEffect(() => {
		if (chosenResearch) {
			//save article's ID in sessionStorage
			sessionStorage.setItem('articleId', chosenResearch.id);
			setArticleId(chosenResearch.id);
			const coverImgLocal = chosenResearch.attachments.find(
				(attachment) => attachment.file_type === 'main_bg',
			);

			const otherFiles = chosenResearch.attachments.filter(
				(attachment) => attachment.file_type !== 'main_bg',
			);

			const editedLocalForm = { ...chosenResearch, attachments: otherFiles };

			//delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			//delete editedLocalForm.updated_at;

			setCoverImage(coverImgLocal);
			setLocalCats(chosenResearch.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(chosenResearch.tags);

			//checking validation for published case vs. draft case
			if (chosenResearch.status === 'published') {
				setContentNotOK({ focus: true, isText: true, everTyped: true });
				setValidationResult(true);
				setCoverImageOK({ initial: true, final: true });
			} else {
				if (coverImgLocal) setCoverImageOK({ initial: true, final: true });

				if (chosenResearch.categories.length && chosenResearch.title.length)
					setValidationResult(true);
			}
		}
		// Remove id when component unmounts

		return () => {
			sessionStorage.removeItem('articleId');
		};
	}, [chosenResearch]);

	//keeping track of rte content to display if component unmounts
	//(updates only when component mounts: otherwise the default value for rte keeps changing and disrupts adding new content properly)

	useEffect(() => {
		if (localStorage.getItem('article')) {
			setStorageDefaultContent(JSON.parse(localStorage.getItem('article')).content);
		}
	}, []);

	// This useEffect sets a listener for attempts to leave the page, and tracks cases in which this is done with unsaved changes

	useEffect(() => {
		const unblock = history.block((location) => {
			if (
				location.pathname !== 'new-article' &&
				!navigationAllowed &&
				(localStorage.getItem('article') ||
					localStorage.getItem('tags') ||
					localStorage.getItem('categories') ||
					localStorage.getItem('coverImage'))
			) {
				setOpenAlert(true);
				setRequestedLocation(location.pathname);

				return navigationAllowed;
			}

			return true;
		});

		return () => {
			unblock();
		};
	}, [navigationAllowed]);

	const sendPublication = async (buttonMarker) => {
		const attachmentsCopy = [...localForm.attachments];

		if (coverImage?.file_name) {
			attachmentsCopy.push(coverImage);
		}

		let formToSend = { ...localForm };

		formToSend.is_publishable = isPublishable;

		const categoriesForServer = localCats.map((cat) => cat.id);
		const tagsForServer = localTags.map((tag) => (tag.id ? { id: tag.id } : { name: tag.name }));

		delete formToSend.author;
		delete formToSend.comments;

		if (buttonMarker === 'done') {
			//allow navigation (remove block from useEffect)

			delete formToSend.published_at;
			delete formToSend.created_at;
			delete formToSend.updated_at;

			setNavigationAllowed(true);

			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: categoriesForServer,
				tags: tagsForServer,
				description: description,
				status: 'published',
				content: processContent(localForm.content),
			};
		} else if (buttonMarker === 'save-draft') {
			//allow navigation (remove block from useEffect)

			setNavigationAllowed(true);
			delete formToSend.created_at;
			delete formToSend.updated_at;

			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: categoriesForServer,
				tags: tagsForServer,
				description: description,
				status: 'draft',
				content: processContent(localForm.content),
			};
		} else if (buttonMarker === 'preview') {
			//opens in a new tab!
			formToSend = {
				...formToSend,
				attachments: attachmentsCopy,
				categories: localCats,
				tags: localTags,
				description: description,
				created_at: new Date(),
			};
			localStorage.setItem('presentation-article', JSON.stringify(formToSend));

			return;
		}

		try {
			let res;

			if (formToSend.id) {
				res = await axios.put(`${BASE_URL}${END_POINT.PUBLICATION}/${formToSend.id}`, formToSend);

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
					history.push('/researches');
				}
			} else {
				res = await axios.post(`${BASE_URL}${END_POINT.PUBLICATION}`, formToSend);

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully published', 2000));
					history.push('/researches');
				}
			}

			clearStorage();
		} catch (error) {
			if (!error.response.data.success) {
				dispatch(actionSnackBar.setSnackBar('error', error.response.data.message, 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Saving failed', 2000));
			}
		}
	};

	const handleChange = (value, key) => {
		const data = { ...localForm, [key]: value };

		setLocalForm(data);
		setLocalStorageArticle(data);

		if (chosenResearch) {
			validateEditedLivePublication({ [key]: value }, errors, setErrors, setValidationResult);
		} else {
			validateLivePublication({ [key]: value }, errors, setErrors, setValidationResult);
		}
	};

	const handleCatsChange = (values) => {
		const newCats = [];

		for (const cat of values) {
			newCats.push(cat.id);
		}

		setLocalCats(values);

		// Check if not in edit mode
		if (!articleId) {
			// Update categories in localStorage
			localStorage.setItem('categories', JSON.stringify(values));
		}

		if (chosenResearch) {
			validateEditedLivePublication({ categories: newCats }, errors, setErrors, setValidationResult);
		} else {
			validateLivePublication({ categories: newCats }, errors, setErrors, setValidationResult);
		}
	};

	const handleEvent = (value, key) => {
		setCurrentEvent((prev) => ({ ...prev, [key]: value }));
		validateEvent({ [key]: value }, errorsEvent, setErrorsEvent, setValidationResultEvent);
	};

	const addEvent = () => {
		const execEvents = [...localForm.events];

		execEvents.push(currentEvent);

		const data = {
			...localForm,
			events: execEvents,
		};

		setLocalForm(data);
		setLocalStorageArticle(data);

		setCurrentEvent({
			date: null,
			title: '',
		});
		setErrorsEvent({});
		setScrollLocation('bottom');
	};

	const deleteItem = (index, category) => {
		const categoryCopy = [...localForm[category]];

		categoryCopy.splice(index, 1);

		const data = {
			...localForm,
			[category]: categoryCopy,
		};

		setLocalForm(data);
		setLocalStorageArticle(data);
	};

	const updatePropertyField = (rowIndex, value, key, category) => {
		const categoryCopy = [...localForm[category]];

		categoryCopy[rowIndex][key] = value;
		const data = {
			...localForm,
			[category]: categoryCopy,
		};

		setLocalForm(data);
		setLocalStorageArticle(data);

		if (category === 'events') {
			setScrollLocation('event');
		}
	};

	const checkIfCurrentEventFilled = () => {
		let check = true;

		for (const [key, value] of Object.entries(currentEvent)) {
			if (!value || (key === 'date' && !isValid(new Date(value)))) {
				check = false;
			}
		}

		return check;
	};

	const ifCurrentEventFilled = checkIfCurrentEventFilled();

	const onDrop = async (acceptedFiles) => {
		const attachmentsCopy = [...localForm.attachments];

		for (const file of acceptedFiles) {
			const formData = new FormData();

			formData.append('file', file);

			try {
				const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);

				if (res.status === 200) {
					const newAttachment = {
						file_name: file.name,
						file_type: file.name.slice(file.name.lastIndexOf('.')),
						file_name_system: res.data.file,
					};

					attachmentsCopy.push(newAttachment);

					const data = { ...localForm, attachments: attachmentsCopy };

					setLocalForm(data);
					setLocalStorageArticle(data);
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
			}
		}
	};

	const onDropCover = async (acceptedFiles) => {
		const coverImage = acceptedFiles[0];
		const formData = new FormData();

		formData.append('file', coverImage);

		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);

			if (res.status === 200) {
				const newCover = {
					file_type: 'main_bg',
					file_name: coverImage.name,
					file_name_system: res.data.file,
				};

				setCoverImage(newCover);

				// Check if not in edit mode
				if (!articleId) {
					// Update cover image in localStorage
					localStorage.setItem('coverImage', JSON.stringify(newCover));
				}

				setCoverImageOK({ initial: true, final: true });
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'File upload failed', 2000));
		}
	};

	const handleTagsValue = (e, values) => {
		const tempTags = [];
		const tagNamesCopy = [...localTags.map((tag) => tag.name)];

		values.forEach((value) => {
			//new user value with enter key

			if (typeof value === 'string' && !tagNamesCopy.includes(value)) {
				tempTags.push({ name: value });
				//disallows duplicates
			} else if (typeof value === 'string' && tagNamesCopy.includes(value)) {
				return;
			} else if (value && value.inputValue) {
				// new user value with select
				tempTags.push({ name: value.inputValue });
			} else {
				tempTags.push(value);
			}
		});
		setLocalTags(tempTags);

		// Check if not in edit mode
		if (!articleId) {
			// Update tags in localStorage
			localStorage.setItem('tags', JSON.stringify(tempTags));
		}

		//if tag exists in server- send tag's id; if new- send tag's name, server will include it in tag list
	};

	const handleEditorChange = (event) => {
		const plaintext = event.getCurrentContent().getPlainText();

		if (plaintext.length < 200) {
			setDescription(plaintext);
		} else {
			setDescription(plaintext.slice(0, 200));
		}

		const content = convertToRaw(event.getCurrentContent());
		const data = { ...localForm, content: content };

		if (event.getLastChangeType()) {
			//if ever typed- last change will not be null

			setContentNotOK((prevState) => ({ ...prevState, everTyped: true }));
			//local storage is updated only if a true change was made, otherwise it gets empty when component mounts, as handleEditorChange is being called when mounting
			setLocalForm(data);
			setLocalStorageArticle(data);
		}

		if (event.getCurrentContent().hasText()) {
			setContentNotOK((prevState) => ({ ...prevState, isText: true }));
		} else {
			setContentNotOK((prevState) => ({ ...prevState, isText: false }));
		}
	};

	const handleEditorOnFocus = () => {
		setContentNotOK((prevState) => ({ ...prevState, focus: true }));
	};

	return (
		<AuthorsNewArticleView
			localForm={localForm}
			handleChange={handleChange}
			errors={errors}
			setErrors={setErrors}
			showEditorError={showEditorError}
			handleEditorChange={handleEditorChange}
			handleEditorOnFocus={handleEditorOnFocus}
			storageDefaultContent={storageDefaultContent}
			chosenResearch={chosenResearch}
			location={location}
			contentNotOK={contentNotOK}
			coverImage={coverImage}
			setCoverImage={setCoverImage}
			coverImageOK={coverImageOK}
			setCoverImageOK={setCoverImageOK}
			openAlert={openAlert}
			setNavigationAllowed={setNavigationAllowed}
			requestedLocation={requestedLocation}
			localCats={localCats}
			setLocalCats={setLocalCats}
			handleCatsChange={handleCatsChange}
			validationResult={validationResult}
			setValidationResult={setValidationResult}
			localTags={localTags}
			setLocalTags={setLocalTags}
			handleTagsValue={handleTagsValue}
			currentEvent={currentEvent}
			setCurrentEvent={setCurrentEvent}
			handleEvent={handleEvent}
			validateEvent={validateEvent}
			errorsEvent={errorsEvent}
			setErrorsEvent={setErrorsEvent}
			validationResultEvent={validationResultEvent}
			setValidationResultEvent={setValidationResultEvent}
			ifCurrentEventFilled={ifCurrentEventFilled}
			addEvent={addEvent}
			tableRowsRefs={tableRowsRefs}
			updatePropertyField={updatePropertyField}
			deleteItem={deleteItem}
			sendPublication={sendPublication}
			handleCloseAlert={handleCloseAlert}
			alertDeleteHandler={clearStorage}
			isPublishable={isPublishable}
			onDrop={onDrop}
			onDropCover={onDropCover}
		/>
	);
};

AuthorsNewArticle.displayName = 'AuthorsNewArticle';
AuthorsNewArticle.defaultProps = {};

export default React.memo(AuthorsNewArticle);
