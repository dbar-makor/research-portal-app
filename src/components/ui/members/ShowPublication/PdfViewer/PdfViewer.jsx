import React from 'react';

import { BASE_URL } from '../../../../../utils/constants';

import PdfViewerView from './PdfViewer.view';

const PdfViewer = (props) => {
	const downloadFile = (fileName) => {
		window.open(`${BASE_URL}/assets/${fileName}`, '_blank');
	};

	return <PdfViewerView pdf={props.pdf} downloadFile={downloadFile} />;
};

PdfViewer.displayName = 'PdfViewer';
PdfViewer.defaultProps = {};

export default React.memo(PdfViewer);
