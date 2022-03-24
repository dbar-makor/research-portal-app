import React from 'react';
import { useSelector } from 'react-redux';

import PrivateRouteView from './PrivateRoute.view';

const PrivateRoute = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return <PrivateRouteView component={props.component} isAuthenticated={isAuthenticated} {...props.rest} />;
};

PrivateRoute.displayName = 'PrivateRoute';
PrivateRoute.defaultProps = {};

export default React.memo(PrivateRoute);
