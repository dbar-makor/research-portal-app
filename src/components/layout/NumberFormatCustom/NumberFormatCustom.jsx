import React from 'react';
import PropTypes from 'prop-types';

import NumberFormatCustomView from './NumberFormatCustom.view';

const NumberFormatCustom = (props) => {
	const other = { ...props };

	return (
		<NumberFormatCustomView
			inputRef={props.inputRef}
			decimalNo={props.decimalNo}
			minValue={props.minValue}
			thousandSeparator={props.thousandSeparator}
			other={other}
			onChange={props.onChange}
		/>
	);
};

NumberFormatCustom.displayName = 'NumberFormatCustom';
NumberFormatCustom.defaultProps = {};
NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	decimalNo: PropTypes.number.isRequired,
	minValue: PropTypes.number.isRequired,
};

export default React.memo(NumberFormatCustom);
