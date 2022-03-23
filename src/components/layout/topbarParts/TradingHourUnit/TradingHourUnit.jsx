import React from 'react';
import TradingHourUnitView from './TradingHourUnit.view';

const TradingHourUnit = (props) => {
	return <TradingHourUnitView item={props.item} classes={props.classes} />;
};

TradingHourUnit.displayName = 'TradingHourUnit';
TradingHourUnit.defaultProps = {};

export default React.memo(TradingHourUnit);
