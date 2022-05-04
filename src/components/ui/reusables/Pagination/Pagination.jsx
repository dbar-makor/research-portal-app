import React from 'react';

import PaginationView from './Pagination.view';

const Pagination = (props) => {
	const handleNext = () => {
		if (props.allPages >= props.currentPage + 1) {
			props.setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (props.currentPage > 1) {
			props.setCurrentPage((prev) => prev - 1);
		}
	};

	const goToFirstPage = () => {
		props.setCurrentPage(1);
	};

	const goToLastPage = () => {
		props.setCurrentPage(props.allPages);
	};

	return (
		<PaginationView
			allPages={props.allPages}
			currentPage={props.currentPage}
			setCurrentPage={props.setCurrentPage}
			handleNext={handleNext}
			handlePrev={handlePrev}
			goToFirstPage={goToFirstPage}
			goToLastPage={goToLastPage}
		/>
	);
};

Pagination.displayName = 'Pagination';
Pagination.defaultProps = {};

export default React.memo(Pagination);
