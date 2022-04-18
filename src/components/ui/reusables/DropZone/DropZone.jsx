import React from 'react';

import DropZoneView from './DropZone.view';

const DropZone = (props) => {
	const purpose = props.purpose ? props.purpose : 'cover image';

	const deleteFile = () => {
		// Storage interaction should be re-written in a reusable manner (only suitable to new publication)

		const articleId = sessionStorage.getItem('articleId');
		const deadArticleId = sessionStorage.getItem('deadArticleId');

		// Storage interaction should be re-written in a reusable manner (only suitable to new publication)

		// Check if not in edit mode
		if (!articleId) {
			// Remove cover image from localStorage
			localStorage.removeItem('coverImage');
		}

		// Check if not in dead article edit mode
		if (!deadArticleId) {
			// Remove cover image from localStorage
			localStorage.removeItem('deadArticleCoverImage');
		}

		props.setUploadedImage(typeof uploadedImage === 'string' ? '' : null);
		props.setFileOK && props.setFileOK({ initial: false, final: false });
	};

	return (
		<DropZoneView
			uploadedImage={props.uploadedImage}
			setUploadedImage={props.setUploadedImage}
			purpose={purpose}
			setFileOK={props.setFileOK}
			fileTypes={props.fileTypes}
			deleteFile={deleteFile}
			onDrop={props.onDrop}
		/>
	);
};

DropZone.displayName = 'DropZone';
DropZone.defaultProps = {};

export default React.memo(DropZone);
