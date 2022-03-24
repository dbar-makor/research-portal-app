import React from 'react';

import AllPublicationsStatColumnView from './AllPublicationsStatColumn.view';

const AllPublicationsStatColumn = (props) => {
	return (
		<AllPublicationsStatColumnView
			publishedFieldLabels={props.publishedFieldLabels}
			publishedFields={props.publishedFields}
			draftFieldLabels={props.draftFieldLabels}
			draftFields={props.draftFields}
			statistics={props.statistics}
		/>
	);
};

AllPublicationsStatColumn.displayName = 'AllPublicationsStatColumn';
AllPublicationsStatColumn.defaultProps = {};

export default React.memo(AllPublicationsStatColumn);
