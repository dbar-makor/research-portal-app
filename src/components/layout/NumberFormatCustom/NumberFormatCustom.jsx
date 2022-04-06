import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import NumberFormatCustomView from './NumberFormatCustom.view';

const NumberFormatCustom = forwardRef((props, ref) => {
	return (
		<NumberFormatCustomView
			inputRef={props.inputRef}
			decimalNo={props.decimalNo}
			minValue={props.minValue}
			valueType={props.valueType}
			value={props.value}
			ref={ref}
			other={{ ...props }}
			onChange={props.onChange}
		/>
	);
});

NumberFormatCustom.displayName = 'NumberFormatCustom';
NumberFormatCustom.defaultProps = {};
NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	decimalNo: PropTypes.number.isRequired,
	minValue: PropTypes.number.isRequired,
};

export default React.memo(NumberFormatCustom);
