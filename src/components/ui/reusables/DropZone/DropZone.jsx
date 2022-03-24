import React from 'react';

import DropZoneView from './DropZone.view';

const DropZone = (props) => {
	const purpose = props.purpose ? props.purpose : 'cover image*';

	return (
		<DropZoneView
			uploadedImage={props.uploadedImage}
			setUploadedImage={props.setUploadedImage}
			purpose={purpose}
			setFileOK={props.setFileOK}
			fileTypes={props.fileTypes}
			onDrop={props.onDrop}
		/>
	);
};

DropZone.displayName = 'DropZone';
DropZone.defaultProps = {};

export default React.memo(DropZone);
