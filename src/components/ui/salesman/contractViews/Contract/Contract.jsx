import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { changeChosenCompany, selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';
import { validateContract, validateEditedContract } from '../../../../../utils/helpers/validationFunctions';
import ContractView from './Contract.view';

const chargePeriods = [
	{
		value: 'monthly',
		name: 'Month',
	},
	{
		value: 'quarterly',
		name: 'Quarter',
	},
	{
		value: 'half',
		name: 'Half-year',
	},
	{
		value: 'fully',
		name: 'Year',
	},
];

const periodToNum = {
	monthly: 12,
	quarterly: 4,
	half: 2,
	fully: 1,
};

const Contract = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedinSalesPersonBigObject = useSelector((state) => state.auth.userContent);

	const loggedinSalesPerson = {
		id: loggedinSalesPersonBigObject.id,
		name: loggedinSalesPersonBigObject.name,
	};

	const currenciesArr = useSelector((state) => state.utils.utils.currency);
	const salesmenArr = useSelector((state) => state.utils.utils.sales);
	const chosenCompany = useSelector(selectChosenCompany);

	//saving chosen company & sales/currencies arrays in session storage so it will be kept when refreshing the contract page
	useEffect(() => {
		const savedCompany = sessionStorage.getItem('company');
		const savedCurrencies = sessionStorage.getItem('currencies');
		const savedSalesmen = sessionStorage.getItem('salesmen');

		//console.log('Object.keys(JSON.parse(savedCompany)).length', Object.keys(JSON.parse(savedCompany)).length);

		if (!savedCompany) {
			sessionStorage.setItem('company', JSON.stringify(chosenCompany));
		}

		if (!savedCurrencies) {
			sessionStorage.setItem('currencies', JSON.stringify(currenciesArr));
		}

		if (!savedSalesmen) {
			sessionStorage.setItem('salesmen', JSON.stringify(salesmenArr));
		}
	}, []);

	const initStateContract = {
		id: chosenCompany?.id ? chosenCompany.id : JSON.parse(sessionStorage.getItem('company')).id,
		start_at: new Date(),
		sales: loggedinSalesPerson.id,
		vat: false,
	};

	const [contract, setContract] = useState(initStateContract);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState();
	const [inputValueSales, setInputValueSales] = useState(loggedinSalesPerson.name);
	const [inputValueCurrency, setInputValueCurrency] = useState('');
	const [inputValuePeriodicity, setInputValuePeriodicity] = useState('');

	const handleContract = (value, name, reason) => {
		if (name === 'periodicity') {
			value = value ? value.value : '';
		} else if (name === 'currency') {
			value = value ? value.code : '';
		}
		//number fields trigger setContract only if reason is 'event'(component calls handleContract twice, only first time with reason === event and correct value)

		if (name === 'members' || name === 'amount') {
			if (reason === 'event') {
				setContract((prev) => ({
					...prev,
					[name]: value,
				}));
			}
		} else {
			setContract((prev) => ({
				...prev,
				[name]: value,
				//[name]: name === 'members' || name === 'amount' ? Number(value) : value,
			}));
		}

		if (props.chosenContract) {
			// in case of editing - this is the validation function
			validateEditedContract({ [name]: value }, errors, setErrors, setValidationResult);
		} else {
			// in case of new contract - this is the validation function
			validateContract({ [name]: value }, errors, setErrors, setValidationResult);
		}
	};

	//useEffect to populate fields in case of editing existing contract
	useEffect(() => {
		if (props.chosenContract) {
			setContract(props.chosenContract);
			setInputValueSales(props.chosenContract.sales.name);
			setInputValueCurrency(props.chosenContract.currency.name);
			const periodicityName = chargePeriods.find(
				(period) => period.value === props.chosenContract.periodicity,
			).name;

			setInputValuePeriodicity(periodicityName);
		}
	}, [props.chosenContract]);

	//submitting new contract only (not edited)

	const handleSubmit = async () => {
		try {
			const res = await axios.post(`${BASE_URL}${END_POINT.CONTRACT}`, {
				...contract,
				id: chosenCompany.id,
			});

			if (res.status === 200 || res.status === 201) {
				props.setContractCopy({ ...contract, contract_id: res.data.id });
				setContract({});
				sessionStorage.clear();
				dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
				props.setStep(2);
			}
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a contract', 2000));
		}
	};

	//relevant for new contract (not editing)

	const handleCancel = () => {
		dispatch(changeChosenCompany(null));
		history.push('/companies');
	};

	//relevant for editing mode

	const handleUpdate = async () => {
		props.setLoadingSidebar(true);
		//preparing contract data to put call
		const contractCopy = { ...contract };
		const contract_id = contract.contract_id;

		delete contractCopy.contract_id;
		delete contractCopy.invoices;
		delete contractCopy.signer_user;

		const currency = contract.currency?.code;

		contractCopy.currency = currency;
		const sales = contract.sales?.id;

		contractCopy.sales = sales;
		// const signer_user = contract.signer_user?.id;
		// contractCopy.signer_user = signer_user;

		try {
			const res = await axios.put(`${BASE_URL}${END_POINT.CONTRACT}/${contract_id}`, contractCopy);

			if (res.status === 201 || res.status === 200) {
				// dispatch(actionSnackBar.setSnackBar('success', 'Successfully updated', 2000));
				props.setLoadingSidebar(false);
				props.setActiveSidebar(true);
				setValidationResult(false);
			}
		} catch (error) {
			/* eslint no-console: "off" */
			console.log(error);
			props.setLoadingSidebar(false);
		}
	};

	return (
		<ContractView
			chosenCompany={chosenCompany ? chosenCompany : JSON.parse(sessionStorage.getItem('company'))}
			salesmenArr={salesmenArr ? salesmenArr : JSON.parse(sessionStorage.getItem('salesmen'))}
			currenciesArr={currenciesArr ? currenciesArr : JSON.parse(sessionStorage.getItem('currencies'))}
			contract={contract}
			setContract={setContract}
			handleContract={handleContract}
			errors={errors}
			inputValueSales={inputValueSales}
			setInputValueSales={setInputValueSales}
			inputValueCurrency={inputValueCurrency}
			setInputValueCurrency={setInputValueCurrency}
			chargePeriods={chargePeriods}
			inputValuePeriodicity={inputValuePeriodicity}
			setInputValuePeriodicity={setInputValuePeriodicity}
			periodToNum={periodToNum}
			stepperMode={props.stepperMode}
			validationResult={validationResult}
			handleCancel={handleCancel}
			handleSubmit={handleSubmit}
			handleUpdate={handleUpdate}
		/>
	);
};

Contract.displayName = 'Contract';
Contract.defaultProps = {};

export default React.memo(Contract);
