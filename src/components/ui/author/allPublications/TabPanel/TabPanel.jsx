import React from 'react';

import TabPanelView from './TabPanel.view';

const TabPanel = (props) => {
	return (
		<TabPanelView value={props.value} index={props.index} other={props.other}>
			{props.children}
		</TabPanelView>
	);
};

TabPanel.displayName = 'TabPanel';
TabPanel.defaultProps = {};

export default React.memo(TabPanel);
