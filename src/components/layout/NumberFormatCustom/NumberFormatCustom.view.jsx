import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

const NumberFormatCustomView = forwardRef((props, ref) => {
	return (
		<NumberFormat
			{...props.other}
			isAllowed={(values) => {
				const { formattedValue, floatValue } = values;

				return formattedValue === '' || floatValue >= props.minValue;
			}}
			value={props.value}
			allowNegative={false}
			defaultValue={props.value}
			decimalScale={props.decimalNo}
			getInputRef={ref}
			thousandSeparator={props.thousandSeparator === false ? props.thousandSeparator : true}
			isNumericString
			onValueChange={(values) => {
				props.onChange({
					target: {
						value: values.value,
						name: props.name,
					},
				});
			}}
		/>
	);
});

NumberFormatCustomView.displayName = 'NumberFormatCustomView';
NumberFormatCustomView.defaultProps = {};

export default React.memo(NumberFormatCustomView);
