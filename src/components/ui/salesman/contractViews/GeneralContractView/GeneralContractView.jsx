import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';
import useSessionStorageRedux from '../../../../../customHooks/useSessionStorageRedux';
import useSessionStorageState from '../../../../../customHooks/useSessionStorageState';
import GeneralContractViewView from './GeneralContractView.view';

const GeneralContractView = () => {
	// Step is saved in session storage in order to preserve it upon refresh (othewise, if refreshing on sep 1, user is referred back to step 1)
	const [step, setStep] = useSessionStorageState('step', 1);
	const chosenCompany = useSelector(selectChosenCompany);
	const [contractCopy, setContractCopy] = useState({});

	// Saving componay's data in session storage so it will not disappear upon refresh
	useSessionStorageRedux('company', chosenCompany);

	return (
		<GeneralContractViewView
			chosenCompany={chosenCompany}
			step={step}
			setStep={setStep}
			setContractCopy={setContractCopy}
			contractCopy={contractCopy}
		/>
	);
};

GeneralContractView.displayName = 'GeneralContractView';
GeneralContractView.defaultProps = {};

export default React.memo(GeneralContractView);
