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

//[props.name] : values.floatValue

// props.onChange({
// 	target: {
// 		value: values.floatValue,
// 		name: props.name,
// 	},
// });

NumberFormatCustomView.displayName = 'NumberFormatCustomView';
NumberFormatCustomView.defaultProps = {};

export default React.memo(NumberFormatCustomView);
