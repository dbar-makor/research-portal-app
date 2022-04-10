import React from 'react';

import SelectFormControlView from './SelectFormControl.view';

const SelectFormControl = (props) => {
	return (
		<SelectFormControlView
			value={props.value || ''}
			placeholder={props.placeholder}
			valueField="value"
			optionsArray={props.optionsArray}
			labelField="name"
			svgRight={props.svgRight}
			IconComponent={props.iconComponent}
			onChange={props.onChange}
		/>
	);
};

SelectFormControl.displayName = 'SelectFormControl';
SelectFormControl.defaultProps = {};

export default React.memo(SelectFormControl);
