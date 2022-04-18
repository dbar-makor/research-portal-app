import React from 'react';

import UploadFileButtonInputView from './UploadFileButtonInput.view';

const shortify = (name = '') => {
	if (name.length > 20) {
		return `${name.slice(0, 19)} ...`;
	} else {
		return name;
	}
};

const UploadFileButtonInput = (props) => {
	return (
		<UploadFileButtonInputView
			handleUpload={props.handleUpload}
			handleDelete={props.handleDelete}
			formObject={props.formObject}
			propertyName={props.propertyName}
			acceptedFileTypes={props.acceptedFileTypes}
			defaultValue={props.defaultValue}
			nonDefaultValue={props.nonDefaultValue}
			placeholder={props.placeholder}
			shortify={shortify}
			errors={props.errors}
		/>
	);
};

UploadFileButtonInput.displayName = 'uploadFileButtonInput';
UploadFileButtonInput.defaultProps = {};

export default React.memo(UploadFileButtonInput);
