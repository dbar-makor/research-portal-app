import React, { useState } from 'react';
import { validateMember } from '../../../../../utils/helpers/validationFunctions';
import MembersStepView from './MembersStep.view';

const MembersStep = (props) => {
	const [editedMemberIndex, setEditedMemberIndex] = useState(-1);

	const addMember = () => {
		const updatedMembers = [...props.company.members, props.currentMember];

		props.setCompany({
			...props.company,
			members: updatedMembers,
		});

		props.setCurrentMember(props.initStateMember);
		props.setErrors({});
	};

	const updateMemberField = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		props.setCurrentMember((prev) => ({
			...prev,
			[name]: value,
		}));

		validateMember({ [name]: value }, props.errors, props.setErrors, props.setValidationResult);
	};

	const handleCatsChange = (values) => {
		const newCats = [];

		for (const cat of values) {
			newCats.push(cat);
		}

		props.currentMember.categories = newCats;

		props.setCurrentMember((prev) => ({ ...prev, categories: newCats }));
		validateMember(
			{ categories: newCats },
			props.errors,
			props.setErrors,
			props.setValidationResult,
			props.company,
		);
	};

	const addEditedMember = () => {
		const currentMembers = [...props.company.members];

		currentMembers[editedMemberIndex] = props.currentMember;
		props.setCompany({ ...props.company, members: currentMembers });
		props.setCurrentMember(props.initStateMember);
		props.setErrors({});
		setEditedMemberIndex(-1);
	};

	return (
		<MembersStepView
			addMember={addMember}
			company={props.company}
			setCompany={props.setCompany}
			updateMemberField={updateMemberField}
			handleCatsChange={handleCatsChange}
			addEditedMember={addEditedMember}
			currentMember={props.currentMember}
			errors={props.errors}
			setErrors={props.setErrors}
			editedMemberIndex={editedMemberIndex}
			setEditedMemberIndex={setEditedMemberIndex}
			validationResult={props.validationResult}
			setValidationResult={props.setValidationResult}
			setCurrentMember={props.setCurrentMember}
		/>
	);
};

MembersStep.displayName = 'MembersStep';
MembersStep.defaultProps = {};

export default React.memo(MembersStep);
