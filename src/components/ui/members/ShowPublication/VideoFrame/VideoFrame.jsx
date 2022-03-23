import React from 'react';

import VideoFrameView from './VideoFrame.view';

const VideoFrame = (props) => {
	return <VideoFrameView video={props.video} />;
};

VideoFrame.displayName = 'VideoFrame';
VideoFrame.defaultProps = {};

export default React.memo(VideoFrame);
