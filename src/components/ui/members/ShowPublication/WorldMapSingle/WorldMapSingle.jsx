import React, { useState } from 'react';

import WorldMapSingleView from './WorldMapSingle.view';

const WorldMapSingle = (props) => {
	const [tooltipState, setTooltipState] = useState(false);

	return (
		<WorldMapSingleView
			tooltipState={tooltipState}
			setTooltipState={setTooltipState}
			d={props.d}
			x={props.x}
			y={props.y}
			citiesStatus={props.citiesStatus}
		/>
	);
};

WorldMapSingle.displayName = 'WorldMapSingle';
WorldMapSingle.defaultProps = {};

export default React.memo(WorldMapSingle);
