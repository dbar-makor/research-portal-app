import React from 'react';

import PaginationView from './Pagination.view';

const Pagination = (props) => {
	return <PaginationView allPages={props.allPages} page={props.page} />;
};

Pagination.displayName = 'Pagination';
Pagination.defaultProps = {};

export default React.memo(Pagination);
