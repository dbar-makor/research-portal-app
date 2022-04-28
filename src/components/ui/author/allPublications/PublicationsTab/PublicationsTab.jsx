import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import {
	selectChosenResearch,
	getChosenResearchAsync,
} from '../../../../../redux/researches/chosenResearchSlice';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import PublicationsTabView from './PublicationsTab.view';

const PublicationsTab = (props) => {
	const [openAlert, setOpenAlert] = useState(false);
	const [redirectMarker, setRedirectMarker] = useState(false);
	const [deleteID, setDeleteID] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();

	const chosenResearch = useSelector(selectChosenResearch);

	useEffect(() => {
		if (chosenResearch && chosenResearch.type === 'live' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/new-article');
		} else if (chosenResearch && chosenResearch.type === 'dead' && redirectMarker) {
			setRedirectMarker(false);
			//change routing!
			history.push('/upload-article');
		}
	}, [chosenResearch]);

	const publishPublication = async (id) => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.put(
				`${BASE_URL}${END_POINT.PUBLICATION}${END_POINT.PUBLISH}/${id}`,
				{},
				{
					headers: { Authorization: token },
				},
			);

			history.push('/researches');

			if (res.status === 201) {
				props.fetchPublications();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully published', 2000));
				props.fetchStatistics();
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'publish  failed', 2000));
		}
	};

	const asyncDelete = async () => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.delete(`${BASE_URL}${END_POINT.PUBLICATION}/${deleteID}`, {
				headers: { Authorization: token },
			});

			if (res.status === 201 || res.status === 200) {
				props.fetchPublications();
				dispatch(actionSnackBar.setSnackBar('success', 'Successfully deleted', 2000));
				props.fetchStatistics();
			}
		} catch (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'Delete failed', 2000));
		}
	};

	const handleEdit = useCallback((id) => {
		dispatch(getChosenResearchAsync(id));
		setRedirectMarker(true);
	});

	const handleCloseAlert = useCallback(() => {
		setOpenAlert(false);
	});

	const deletePublication = useCallback(() => {
		asyncDelete(deleteID);
		setOpenAlert(false);
		setDeleteID('');
	});

	const handleDeleteBtn = useCallback((id) => {
		setOpenAlert(true);
		setDeleteID(id);
	});

	const chooseImage = useCallback((publication) => {
		let image = '';
		let url = '';

		if (publication?.attachments?.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;

			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}

		return url;
	});

	return (
		<PublicationsTabView
			chooseImage={chooseImage}
			publication={props.publication}
			handleDeleteBtn={handleDeleteBtn}
			handleEdit={handleEdit}
			openAlert={openAlert}
			handleCloseAlert={handleCloseAlert}
			deletePublication={deletePublication}
			publishPublication={publishPublication}
		/>
	);
};

PublicationsTab.displayName = 'PublicationsTab';
PublicationsTab.defaultProps = {};

export default React.memo(PublicationsTab);
