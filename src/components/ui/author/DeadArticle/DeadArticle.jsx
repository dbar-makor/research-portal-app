import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { isValid } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { END_POINT, BASE_URL } from '../../../../utils/constants';
import {
	getChosenResearchAsync,
	selectChosenResearch,
	changeChosenResearch,
} from '../../../../redux/researches/chosenResearchSlice';
import * as actionSnackBar from '../../../../redux/SnackBar/action';
import {
	validateDeadPublication,
	validateEvent,
	validateEditedDeadPublication,
} from '../../../../utils/helpers/validationFunctions';

import DeadArticleView from './DeadArticle.view';

const DeadArticle = () => {
	const chosenResearch = useSelector(selectChosenResearch);

	// Check if edit mode
	if (chosenResearch) sessionStorage.setItem('deadArticleId', chosenResearch.id);

	const deadArticleId = sessionStorage.getItem('deadArticleId');

	const dispatch = useDispatch();
	const history = useHistory();
	const [coverImageOK, setCoverImageOK] = useState({ initial: true, final: false });
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const [errorsEvent, setErrorsEvent] = useState({});
	// eslint-disable-next-line no-unused-vars
	const [validationResultEvent, setValidationResultEvent] = useState(true);

	const [currentEvent, setCurrentEvent] = useState({
		date: null,
		title: '',
	});

	const formInitState = {
		title: '',
		description: '',
		events: [],
		tags: [],
		categories: [],
		attachments: [],
		title_video: '',
		link_video: '',
		title_pdf: '',
		file_pdf: '',
		type: 'dead',
	};

	const [localForm, setLocalForm] = useState(() => {
		// Check for article ID exsistence in sessionStorage
		if (deadArticleId) dispatch(getChosenResearchAsync(deadArticleId));

		// Get article from localStorage
		const localStorageDeadArticle = localStorage.getItem('deadArticle');

		// Check for article in localStorage or article is in edit mode
		if (!localStorageDeadArticle || localStorageDeadArticle === 'undefined' || chosenResearch) {
			return formInitState;
		}

		const deadArticle = JSON.parse(localStorageDeadArticle);

		return deadArticle;
	});

	const [coverImage, setCoverImage] = useState(() => {
		// Get cover image from localStorage
		const localStorageCoverImage = localStorage.getItem('deadArticleCoverImage');

		// Check for cover image in localStorage or article is in edit mode
		if (!localStorageCoverImage || localStorageCoverImage === 'undefined' || chosenResearch) return '';

		const coverImage = JSON.parse(localStorageCoverImage);

		return coverImage;
	});

	const [localCats, setLocalCats] = useState(() => {
		// Get cover image from localStorage
		const localStorageCategories = localStorage.getItem('deadArticleCategories');

		// Check for categories in localStorage or article is in edit mode
		if (!localStorageCategories || localStorageCategories === 'undefined' || chosenResearch) return [];

		const categories = JSON.parse(localStorageCategories);

		return categories;
	});

	const [localTags, setLocalTags] = useState(() => {
		// Get tags from localStorage
		const localStorageTags = localStorage.getItem('deadArticleTags');

		// Check for tags in localStorage or article is in edit mode
		if (!localStorageTags || localStorageTags === 'undefined' || chosenResearch) return [];

		const tags = JSON.parse(localStorageTags);

		return tags;
	});

	const [scrollLocation, setScrollLocation] = useState('bottom');
	const tableRowsRefs = useRef([]);
	const [selectedValue, setSelectedValue] = useState('pdf');
	const location = useLocation();

	const handleChangeRadio = (event) => {
		setSelectedValue(event.target.value);
	};

	const executeScroll = () => {
		if (localForm.events.length) {
			const lastIndex = tableRowsRefs.current.length - 1;

			if (scrollLocation === 'bottom') {
				tableRowsRefs.current[lastIndex].scrollIntoView();
			}
		}
	};

	// Save dead article in localStorage
	const setLocalStorageDeadArticle = (data) => {
		if (chosenResearch || deadArticleId) return;

		localStorage.setItem('deadArticle', JSON.stringify(data));
	};

	useEffect(() => {
		if (localForm) {
			tableRowsRefs.current = tableRowsRefs.current.slice(0, localForm.events.length);
			executeScroll();
		}
	}, [localForm.events]);

	//For editing
	useEffect(() => {
		if (chosenResearch) {
			const coverImg = chosenResearch.attachments.find(
				(attachment) => attachment.file_type === 'main_bg',
			);

			//  let categoriesIDs = chosenResearch.categories.map(category => category.id);
			const editedLocalForm = { ...chosenResearch };

			delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			delete editedLocalForm.updated_at;

			setCoverImage(coverImg ? coverImg : '');
			setLocalCats(chosenResearch.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(chosenResearch.tags);
			setSelectedValue(chosenResearch.file_video ? 'video' : 'pdf');

			//checking validation for published case vs. draft case
			if (chosenResearch.status === 'published') {
				setValidationResult(true);
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			} else if (chosenResearch.status === 'draft') {
				if (!coverImg) {
					setCoverImageOK((prev) => ({ ...prev, final: false }));
				}

				if (!chosenResearch.categories.lengt || !chosenResearch.title) {
					setValidationResult(false);
				}
			}
		}
	}, [chosenResearch]);

	//if coming back from preview (chosenResearch is now null even if it is saved in server)
	useEffect(() => {
		if (location.state?.from === 'prearticle') {
			const publication = location.state?.publication;

			const coverImg = publication.attachments?.find(
				(attachment) => attachment.file_type === 'main_bg',
			);

			const editedLocalForm = { ...publication };

			delete editedLocalForm.created_at;
			delete editedLocalForm.name;
			delete editedLocalForm.updated_at;

			setCoverImage(coverImg ? coverImg : '');
			setLocalCats(publication.categories);
			setLocalForm(editedLocalForm);
			setLocalTags(publication.tags);

			//validations
			if (coverImg) {
				setCoverImageOK((prev) => ({ ...prev, final: true }));
			}

			if (publication.categories.length && publication.title) {
				setValidationResult(true);
			}
		}
	}, [chosenResearch]);

	// Clearing states when leaving component
	useEffect(() => {
		return () => {
			setLocalForm(formInitState);
			setCoverImage(null);
			setLocalCats([]);
			setCurrentEvent({ date: null, title: '' });
		};
	}, []);

	const updatePropertyField = (rowIndex, value, key, category) => {
		const categoryCopy = [...localForm[category]];

		categoryCopy[rowIndex][key] = value;

		const data = {
			...localForm,
			[category]: categoryCopy,
		};

		setLocalForm(data);
		setLocalStorageDeadArticle(data);

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

	const addEvent = () => {
		const execEvents = [...localForm.events];

		execEvents.push(currentEvent);

		const data = {
			...localForm,
			events: execEvents,
		};

		setLocalForm(data);
		setLocalStorageDeadArticle(data);

		setCurrentEvent({
			date: null,
			title: '',
		});
		setErrorsEvent({});

		setScrollLocation('bottom');
	};

	const handleCatsChange = (values) => {
		const newCats = [];

		for (const cat of values) {
			newCats.push(cat.id);
		}

		setLocalCats(values);

		// Check if not in edit mode
		if (!deadArticleId) {
			// Update categories in localStorage
			localStorage.setItem('deadArticleCategories', JSON.stringify(values));
		}

		if (chosenResearch) {
			validateEditedDeadPublication(
				{ categories: newCats },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
		} else {
			validateDeadPublication(
				{ categories: newCats },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
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
		if (!deadArticleId) {
			// Update tags in localStorage
			localStorage.setItem('deadArticleTags', JSON.stringify(tempTags));
		}

		//if tag exists in server- send tag's id; if new- send tag's name, server will include it in tag list
	};

	const handleChange = (value, key) => {
		const data = { ...localForm, [key]: value };

		setLocalForm(data);
		setLocalStorageDeadArticle(data);

		if (chosenResearch) {
			validateEditedDeadPublication(
				{ [key]: value },
				errors,
				setErrors,
				setValidationResult,
				selectedValue,
			);
		} else {
			validateDeadPublication({ [key]: value }, errors, setErrors, setValidationResult, selectedValue);
		}
	};

	const deleteItem = (index, category) => {
		if (category === 'localCats') {
			const catsCopy = [...localCats];
			const formCats = [...localForm.categories];

			catsCopy.splice(index, 1);
			formCats.splice(index, 1);
			setLocalCats(catsCopy);

			const data = {
				...localForm,
				categories: formCats,
			};

			setLocalForm(data);
			setLocalStorageDeadArticle(data);

			if (chosenResearch) {
				validateEditedDeadPublication(
					{ categories: formCats },
					errors,
					setErrors,
					setValidationResult,
					selectedValue,
				);
			} else {
				validateDeadPublication(
					{ categories: formCats },
					errors,
					setErrors,
					setValidationResult,
					selectedValue,
				);
			}
		} else {
			const categoryCopy = [...localForm[category]];

			categoryCopy.splice(index, 1);

			const data = {
				...localForm,
				[category]: categoryCopy,
			};

			setLocalForm(data);
			setLocalStorageDeadArticle(data);
		}
	};

	const onPDFUpload = async (e) => {
		const pdf = e.target.files[0];
		const formData = new FormData();

		formData.append('file', pdf);

		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.FILE}`, formData);

			if (res.status === 200 && res.data.file) {
				setLocalForm((prev) => ({ ...prev, file_pdf: res.data.file }));

				const localStorageDeadArticle = localStorage.getItem('deadArticle');

				if (localStorageDeadArticle || localStorageDeadArticle !== 'undefined') {
					const deadArticle = JSON.parse(localStorageDeadArticle);

					// Removing old PDF file from localStorage
					delete deadArticle.file_pdf;

					// Adding new PDF file
					deadArticle.file_pdf = res.data.file;

					localStorage.setItem('deadArticle', JSON.stringify(deadArticle));
				}

				if (chosenResearch) {
					validateEditedDeadPublication(
						{ file_pdf: res.data.file },
						errors,
						setErrors,
						setValidationResult,
						selectedValue,
					);
				} else {
					validateDeadPublication(
						{ file_pdf: res.data.file },
						errors,
						setErrors,
						setValidationResult,
						selectedValue,
					);
				}
			}
		} catch (error) {
			return error;
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
				if (!deadArticleId) {
					// Update cover image in localStorage
					localStorage.setItem('deadArticleCoverImage', JSON.stringify(newCover));
				}

				setCoverImageOK((prev) => ({ ...prev, final: true }));
			}
		} catch (error) {}
	};

	const sendPublication = async (buttonMarker) => {
		const attachmentsCopy = [];

		if (coverImage?.file_name) {
			attachmentsCopy.push(coverImage);
		}

		let formToSend = { ...localForm, attachments: attachmentsCopy };
		const categoriesForServer = localCats.map((cat) => cat.id);
		const tagsForServer = localTags.map((tag) => (tag.id ? { id: tag.id } : { name: tag.name }));

		if (!formToSend.title_video) {
			delete formToSend.title_video;
			delete formToSend.link_video;
		}

		if (!formToSend.title_pdf) {
			delete formToSend.title_pdf;
			delete formToSend.file_pdf;
		}

		delete formToSend.author;
		delete formToSend.comments;

		if (buttonMarker === 'done') {
			formToSend = {
				...formToSend,
				categories: categoriesForServer,
				tags: tagsForServer,
				status: 'published',
			};
		} else if (buttonMarker === 'save-draft') {
			formToSend = {
				...formToSend,
				categories: categoriesForServer,
				tags: tagsForServer,
				status: 'draft',
			};
		} else if (buttonMarker === 'preview') {
			formToSend = { ...localForm, categories: localCats, tags: localTags };

			history.push({
				pathname: '/prearticle',
				state: { publication: formToSend, from: 'new-publication' },
			});

			return;
		}

		try {
			let res;

			if (formToSend.id) {
				res = await axios.put(`${BASE_URL}${END_POINT.PUBLICATION}/${formToSend.id}`, formToSend);
				history.push('/researches');
				dispatch(changeChosenResearch(null));

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				}
			} else {
				res = await axios.post(`${BASE_URL}${END_POINT.PUBLICATION}`, formToSend);
				history.push('/researches');

				if (res.status === 201) {
					dispatch(actionSnackBar.setSnackBar('success', 'Successfully published', 2000));
				}
			}

			localStorage.removeItem('article');
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Publish failed', 2000));
		}
	};

	const handleCancle = () => {
		history.push('/researches');
	};

	// when user navigates outside the component- chosen research is cleared

	useEffect(() => {
		return () => {
			dispatch(changeChosenResearch(null));
		};
	}, []);

	const shortify = (name = '') => {
		if (name.length > 20) {
			return `${name.slice(0, 19)} ...`;
		} else {
			return name;
		}
	};

	return (
		<DeadArticleView
			addEvent={addEvent}
			coverImage={coverImage}
			coverImageOK={coverImageOK}
			currentEvent={currentEvent}
			deleteItem={deleteItem}
			errors={errors}
			errorsEvent={errorsEvent}
			executeScroll={executeScroll}
			handleCatsChange={handleCatsChange}
			handleCancle={handleCancle}
			handleTagsValue={handleTagsValue}
			handleChange={handleChange}
			deadArticleId={deadArticleId}
			handleChangeRadio={handleChangeRadio}
			ifCurrentEventFilled={ifCurrentEventFilled}
			localCats={localCats}
			localForm={localForm}
			localTags={localTags}
			selectedValue={selectedValue}
			sendPublication={sendPublication}
			setErrors={setErrors}
			setErrorsEvent={setErrorsEvent}
			setCoverImage={setCoverImage}
			setCoverImageOK={setCoverImageOK}
			setCurrentEvent={setCurrentEvent}
			setLocalCats={setLocalCats}
			setLocalForm={setLocalForm}
			setLocalTags={setLocalTags}
			setValidationResult={setValidationResult}
			setValidationResultEvent={setValidationResultEvent}
			shortify={shortify}
			updatePropertyField={updatePropertyField}
			validateDeadPublication={validateDeadPublication}
			validateEvent={validateEvent}
			validateEditedDeadPublication={validateEditedDeadPublication}
			validationResult={validationResult}
			ref={tableRowsRefs}
			onPDFUpload={onPDFUpload}
			onDropCover={onDropCover}
		/>
	);
};

DeadArticle.displayName = 'DeadArticle';
DeadArticle.defaultProps = {};

export default React.memo(DeadArticle);
