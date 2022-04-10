import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatCustomView = forwardRef((props, ref) => {
	const filteredOtherProps = Object.assign({}, props.other);

	delete filteredOtherProps.minValue;
	delete filteredOtherProps.decimalNo;
	delete filteredOtherProps.inputRef;

	return (
		<NumberFormat
			{...filteredOtherProps}
			isAllowed={(values) => {
				const { formattedValue, floatValue } = values;

				return formattedValue === '' || floatValue >= props.minValue;
			}}
			value={props.value}
			allowNegative={false}
			defaultValue={props.value}
			decimalScale={props.decimalNo}
			ref={ref}
			thousandSeparator={props.thousandSeparator === false ? false : true}
			//isNumericString
			onValueChange={(values, secondArg) => {
				props.onChange({
					reason: secondArg.source,
					target: {
						value: values.floatValue,
					},
				});
			}}
		/>
	);
});

NumberFormatCustomView.displayName = 'NumberFormatCustomView';
NumberFormatCustomView.defaultProps = {};

export default React.memo(NumberFormatCustomView);
