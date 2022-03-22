import React from 'react';

import { BASE_URL } from '../../../../../utils/constants';
import { Divider, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/PublicationsStyles';
import { ReactComponent as FileEmpty } from '../../../../../assets/icons/fileEmpty.svg';

const AttachmentsView = (props) => {
	const classes = useStyles();

	const downloadFile = (fileName) => {
		window.open(`${BASE_URL}/assets/${fileName}`, '_blank');
	};

	const attachment = (file, idx) => {
		return (
			<Grid item key={idx} className={classes.contentGrid}>
				<Grid
					container
					alignItems="center"
					style={{ marginLeft: 16, width: 'calc(100% - 50px)', cursor: 'pointer' }}
					onClick={() => downloadFile(file.file_name_system)}
				>
					<Grid item style={{ lineHeight: '0px' }}>
						<FileEmpty className={classes.fileEmptyIcon} />
					</Grid>
					<Grid item>
						<Typography className={classes.contentName}>{file.file_name}</Typography>
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const noAttachments = () => {
		return (
			<Grid item xs={12} className={classes.contentGrid}>
				<Typography style={{ fontSize: 16, marginLeft: 16, color: '#001858' }}>
					No attachnents linked to this publication
				</Typography>
			</Grid>
		);
	};

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider}></Divider>
			<Grid container style={{ padding: '10px 0px' }}>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={12}>
							<Typography style={{ fontSize: 20, color: '#868DA2' }}>Attachment</Typography>
						</Grid>
					</Grid>
					{props.attachments.length > 0
						? props.attachments.map((file, idx) => {
								return attachment(file, idx);
						  })
						: noAttachments()}
				</Grid>
			</Grid>
		</Grid>
	);
};

AttachmentsView.displayName = 'AttachmentsView';
AttachmentsView.defaultProps = {};

export default React.memo(AttachmentsView);
