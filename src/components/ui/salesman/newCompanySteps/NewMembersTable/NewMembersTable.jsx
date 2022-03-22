import React, { useState, useCallback } from 'react';
import NewMembersTableView from './NewMembersTable.view';

const NewMembersTable = (props) => {
	const rows = props.members;
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	});

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	});

	const deleteMember = useCallback((index) => {
		const currentMembers = [...props.company.members];

		currentMembers.splice(index, 1);
		props.setCompany({
			...props.company,
			members: currentMembers,
		});
		handleClose();
	});

	const editMember = useCallback((index) => {
		props.setEditedMemberIndex(index);
		const chosenMember = props.company.members[index];

		props.setCurrentMember(chosenMember);
		props.setErrors({ member_name: '', username: '', email: '', position: '', categories: '' });
		handleClose();
	});

	return (
		<NewMembersTableView
			handleClick={handleClick}
			handleClose={handleClose}
			deleteMember={deleteMember}
			editMember={editMember}
			rows={rows}
			anchorEl={anchorEl}
			open={open}
		/>
	);
};

NewMembersTable.displayName = 'NewMembersTable';
NewMembersTable.defaultProps = {};

export default React.memo(NewMembersTable);
