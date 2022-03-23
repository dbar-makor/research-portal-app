import React from 'react';
import FooterMemberView from './FooterMember.view';

const FooterMember = () => {
	return <FooterMemberView />;
};

FooterMember.displayName = 'FooterMember';
FooterMember.defaultProps = {};

export default React.memo(FooterMember);
