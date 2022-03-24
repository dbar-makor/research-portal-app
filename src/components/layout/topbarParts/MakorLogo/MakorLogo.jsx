import React from 'react';

import MakorLogoView from './MakorLogo.view';

const MakorLogo = (props) => {
	return <MakorLogoView userType={props.userType} classes={props.classes} />;
};

MakorLogo.displayName = 'MakorLogo';
MakorLogo.defaultProps = {};

export default React.memo(MakorLogo);
