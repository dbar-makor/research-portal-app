import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import CommentView from './Comment.view';

const Comment = (props) => {
	const [open, setOpen] = useState(false);
	const [openReply, setOpenReply] = useState(false);

	const [reply, setReply] = useState({
		publication_id: props.pubId,
		content: '',
		comment_id: props.cmntId,
	});

	const userType = useSelector((state) => state.auth.userContent.type);

	const replyChangeHandler = (content) => {
		props.replyHendler(content);
		setReply({ ...reply, content: '' });

		if (open === false) {
			setOpen(true);
		}

		setOpenReply(false);
	};

	return (
		<CommentView
			comment={props.comment}
			cmtNo={props.cmtNo}
			openReply={openReply}
			reply={reply}
			setReply={setReply}
			setOpenReply={setOpenReply}
			userType={userType}
			replyChangeHandler={replyChangeHandler}
		/>
	);
};

Comment.displayName = 'Comment';
Comment.defaultProps = {};

export default React.memo(Comment);
