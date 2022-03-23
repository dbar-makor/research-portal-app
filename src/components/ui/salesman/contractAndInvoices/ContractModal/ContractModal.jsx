import React from 'react';
import ContractModalView from './ContractModal.view';

const ContractModal = (props) => {
	return <ContractModalView isOpen={props.isOpen} onClose={props.onClose} client={props.client} />;
};

ContractModal.displayName = 'ContractModal';
ContractModal.defaultProps = {};

export default React.memo(ContractModal);
