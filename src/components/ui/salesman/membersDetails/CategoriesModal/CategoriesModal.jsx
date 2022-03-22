import React from 'react';

import CategoriesModalView from './CategoriesModal.view';

const CategoriesModal = (props) => {
	return (
		<CategoriesModalView
			open={props.open}
			handleClose={props.handleClose}
			currentMember={props.currentMember}
			setCurrentMember={props.setCurrentMember}
			updateMemberField={props.updateMemberField}
			memberIndex={props.memberIndex}
			membersRows={props.membersRows}
			setMembersRows={props.setMembersRows}
			sendMember={props.sendMember}
		></CategoriesModalView>
	);
};

CategoriesModal.displayName = 'CategoriesModal';
CategoriesModal.defaultProps = {};

export default React.memo(CategoriesModal);
