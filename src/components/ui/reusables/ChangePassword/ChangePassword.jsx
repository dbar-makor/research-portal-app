import React from 'react';

import ChangePasswordView from './ChangePassword.view';

const ChangePassword = (props) => {
	return <ChangePasswordView chosenModal={props.chosenModal} handleCloseModal={props.handleCloseModal} />;
};

ChangePassword.displayName = 'ChangePassword';
ChangePassword.defaultProps = {};

export default React.memo(ChangePassword);
