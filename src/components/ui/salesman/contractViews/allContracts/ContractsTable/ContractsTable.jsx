import React from 'react';
import ContractsTableView from './ContractsTable.view';

const headersName = [
	'Status',
	'Signaturre',
	'Contract Period',
	'Company',
	'Country',
	'Period',
	'Amount',
	'Yearly Cost',
	'Actions',
];

const ContractsTable = (props) => {
	return <ContractsTableView headersName={headersName} contractsRows={props.contractsRows} />;
};

ContractsTable.displayName = 'ContractsTable';
ContractsTable.defaultProps = {};

export default React.memo(ContractsTable);
