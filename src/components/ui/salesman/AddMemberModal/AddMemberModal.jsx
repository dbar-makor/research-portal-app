import React, { useState } from 'react';
import { validateMember } from '../../../../utils/helpers/validationFunctions';
import AddMemberModalView from './AddMemberModal.view';

const AddMemberModal = (props) => {
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);

	const handleCatsChange = (values) => {
		const newCats = [];

		for (const cat of values) {
			newCats.push(cat);
		}

		props.setNewMember({ ...props.newMember, categories: newCats });
		validateMember({ categories: newCats }, errors, setErrors, setValidationResult);
	};

	const updateMemberField = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		props.setNewMember({ ...props.newMember, [name]: value });

		validateMember({ [name]: value }, errors, setErrors, setValidationResult);
	};

	return (
		<AddMemberModalView
			open={props.open}
			handleClose={props.handleClose}
			companyName={props.companyName}
			newMember={props.newMember}
			setNewMember={props.setNewMember}
			handleCatsChange={handleCatsChange}
			updateMemberField={updateMemberField}
			errors={errors}
			setErrors={setErrors}
			validationResult={validationResult}
			setValidationResult={setValidationResult}
			addMember={props.addMember}
		/>
	);
};

AddMemberModal.displayName = 'AddMemberModal';
AddMemberModal.defaultProps = {};

export default React.memo(AddMemberModal);
