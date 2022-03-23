import React from 'react';
import ContractModalView from './ContractModal.view';

const ContractModal = (props) => {
	return <ContractModalView isOpen={props.isOpen} client={props.client} onClose={props.onClose} />;
};

ContractModal.displayName = 'ContractModal';
ContractModal.defaultProps = {};

export default React.memo(ContractModal);
