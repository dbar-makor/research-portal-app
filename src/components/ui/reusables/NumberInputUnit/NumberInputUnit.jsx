import React from 'react';
import NumberInputUnitView from './NumberInputUnit.view';

const NumberInputUnit = (props) => {
	const error = props.error ? props.error : null;

	return (
		<NumberInputUnitView
			className={props.className}
			name={props.name}
			label={props.label}
			value={props.value}
			InputProps={props.InputProps}
			error={error}
			onChange={props.onChange}
		/>
	);
};

NumberInputUnit.displayName = 'NumberInputUnit';
NumberInputUnit.defaultProps = {};

export default React.memo(NumberInputUnit);
