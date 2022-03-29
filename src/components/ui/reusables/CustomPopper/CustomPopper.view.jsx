import React from 'react';
import { Popper } from '@material-ui/core';

//import useStyles from './CustomPopper.style';

const CustomPopperView = (props) => {

  return <Popper {...props} id='research-popper' style={{ width: 'fit-content' }} placement='bottom-start' />;
};

CustomPopperView.displayName = 'CustomPopperView';
CustomPopperView.defaultProps = {};

export default React.memo(CustomPopperView);
