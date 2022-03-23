import React from 'react';
import ButtonRowView from './ButtonRow.view';

const ButtonRow = (props) => {
	const handlerLeft = props.handlerLeft ? props.handlerLeft : () => {};
	const textButtonLeft = props.textButtonLeft ? props.textButtonLeft : '';

	return (
		<ButtonRowView
			validationResult={props.validationResult}
			handlerRight={props.handlerRight}
			textButtonRight={props.textButtonRight}
			style={props.style}
			handlerLeft={handlerLeft}
			textButtonLeft={textButtonLeft}
		/>
	);
};

ButtonRow.displayName = 'ButtonRow';
ButtonRow.defaultProps = {};

export default React.memo(ButtonRow);
