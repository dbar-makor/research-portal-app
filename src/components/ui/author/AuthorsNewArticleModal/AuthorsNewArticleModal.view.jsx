import { Button, Grid, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import { ReactComponent as ArticleIcon } from '../../../../assets/icons/articleIcon.svg';
import { ReactComponent as UploadIcon } from '../../../../assets/icons/uploadIcon.svg';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/closeIcon.svg';
import useStyles from './AuthorsNewArticleModal.style';

const AuthorsNewArticleModalView = (props) => {
	const classes = useStyles();

	return (
		<Dialog open={props.open} className={classes.dialog} onClose={props.handleClose}>
			<Grid container justifyContent="center" className={classes.modalContainer}>
				<Grid item xs={12}>
					<Grid container className={classes.end}>
						<Grid item xs={12}>
							<CloseIcon className={classes.closeIcon} onClick={props.handleClose} />
						</Grid>
					</Grid>

					<Grid container justifyContent="center" className={classes.paddingGrid}>
						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<Typography className={classes.modalTitle}>New Article</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<Typography className={classes.articleType}>
										Select the type of article
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={5}>
										<Button
											className={classes.buttonStyle}
											onClick={() => props.history.push('/new-article')}
										>
											<Grid container>
												<Grid item xs={12}>
													<Grid container>
														<Grid item xs={12}>
															<ArticleIcon
																//   style={{ color: "red" }}
																className={classes.marginTop14px}
															/>
														</Grid>
													</Grid>
													<Grid container>
														<Grid item xs={12} className={classes.articleTitle2}>
															<Typography className="articleTitle">
																Write an Article
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Button>
									</Grid>
									<Grid item xs={2} />
									<Grid item xs={5}>
										<Button
											className={classes.button2Style}
											onClick={() => props.history.push('/upload-article')}
										>
											<Grid container>
												<Grid item xs={12}>
													<Grid container>
														<Grid item xs={12}>
															<UploadIcon />
														</Grid>
													</Grid>
													<Grid container>
														<Grid item xs={12} className={classes.uploadTitle}>
															<Typography className="uploadTitle">
																Upload Files
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

AuthorsNewArticleModalView.displayName = 'AuthorsNewArticleModalView';
AuthorsNewArticleModalView.defaultProps = {};

export default React.memo(AuthorsNewArticleModalView);
