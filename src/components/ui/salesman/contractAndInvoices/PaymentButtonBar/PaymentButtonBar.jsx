import React, { useRef, useState } from 'react';

import PaymentButtonBarView from './PaymentButtonBar.view.jsx';

const PaymentButtonBar = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const contractEditMainRef = useRef();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<PaymentButtonBarView
			precentage={props.precentage}
			isOpen={props.isOpen}
			id={id}
			open={open}
			anchorEl={anchorEl}
			handleClose={handleClose}
			contractEditMainRef={contractEditMainRef}
			contract={props.contract}
			clientName={props.clientName}
			openInvoices={props.openInvoices}
			handleClick={handleClick}
		>
			{' '}
		</PaymentButtonBarView>
	);
};

PaymentButtonBar.displayName = 'PaymentButtonBar';
PaymentButtonBar.defaultProps = {};

export default React.memo(PaymentButtonBar);
