import React from 'react';

import MembersHeaderView from './MembersHeader.view';

const MembersHeader = (props) => {
	return (
		<MembersHeaderView
			allMembersAmount={props.allMembersAmount}
			activeMembersAmount={props.activeMembersAmount}
			showAll={props.showAll}
			setShowAll={props.setShowAll}
			memberSearch={props.memberSearch}
			setMemberSearch={props.setMemberSearch}
			companyName={props.companyName}
			addMember={props.addMember}
			handleCloseModal={props.handleCloseModal}
			handleOpenModal={props.handleOpenModal}
			openAddMember={props.openAddMember}
			newMember={props.newMember}
			setNewMember={props.setNewMember}
		/>
	);
};

MembersHeader.displayName = 'MembersHeader';
MembersHeader.defaultProps = {};

export default React.memo(MembersHeader);
