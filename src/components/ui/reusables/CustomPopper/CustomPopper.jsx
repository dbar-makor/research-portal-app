import React from 'react';

import CustomPopperView from './CustomPopper.view';

const CustomPopper = (props) => {
  return <CustomPopperView className='customPopper' {...props} />;
};

CustomPopper.displayName = 'CustomPopper';
CustomPopper.defaultProps = {};

export default React.memo(CustomPopper);
