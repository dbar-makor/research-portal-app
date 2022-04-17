import React from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { BinButton, EditButton, FilledButton } from '../../../../../styles/MainStyles';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/IconTrash.svg';
import DeleteAlert from '../../../reusables/DeleteAlert/DeleteAlert';
import { ReactComponent as EmptyFile } from '../../../../../assets/icons/fileEmpty.svg';
import useStyles from './PublicationsTab.style';

const PublicationsTabView = (props) => {
	const classes = useStyles();

	return (
		<>
			<Grid item xs={4} className={classes.cardWrapper} key={props.publication.id}>
				<Grid container className={classes.card}>
					<Grid
						item
						xs={12}
						className={classes.upperHalf}
						style={{
							backgroundImage: props.chooseImage(props.publication)
								? `url(${props.chooseImage(props.publication)})`
								: 'none',
							backgroundColor: '#74b2f0',
						}}
					>
						{props.publication.status === 'published' ? (
							<Grid item xs={3} className={classes.viewsBox}>
								<VisibilityIcon className={classes.visibleIcon} />
								{props.publication.views}
							</Grid>
						) : null}
						{props.publication.status === 'draft' && props.publication.is_publishable ? (
							<Grid item xs={4}>
								<FilledButton
									className={classes.publishStyle}
									onClick={() => props.sendPublication('done')}
								>
									Publish
								</FilledButton>
							</Grid>
						) : null}

						{props.publication.type === 'dead' ? (
							<Grid className={classes.typeIndicator}>
								{props.publication.title_video ? (
									<PlayArrowIcon className={classes.typeIcon} />
								) : (
									<EmptyFile className={classes.typeIcon} />
								)}
							</Grid>
						) : (
							<></>
						)}
					</Grid>
					<Grid item xs={12} className={classes.backdrop}>
						<BinButton
							className={classes.binBtn}
							onClick={() => props.handleDeleteBtn(props.publication.id)}
						>
							<DeleteIcon />
						</BinButton>
						<EditButton
							className={classes.editBtn}
							onClick={() => props.handleEdit(props.publication.id)}
						>
							<EditIcon />
						</EditButton>
					</Grid>
					<Grid
						item
						container
						xs={12}
						direction="column"
						justifyContent="space-between"
						className={classes.lowerHalf}
					>
						<Grid item>
							<Typography variant="h5" className={classes.pubTitle}>
								{props.publication.title}
							</Typography>
							<Typography className={classes.pubDescription}>
								{props.publication.description.substring(0, 75)}
							</Typography>
						</Grid>
						{props.publication.categories.length ? (
							<Grid item>
								<Grid container className={classes.chipContainer}>
									{props.publication.categories.slice(0, 2).map((el, index) => (
										<Grid item key={index} className={classes.chipItem}>
											<Chip
												variant="outlined"
												label={el.name}
												className={classes.chip}
											/>
										</Grid>
									))}
									{props.publication.categories.length - 2 > 0 && (
										<Grid>
											<Chip
												variant="outlined"
												label={`+${props.publication.categories.length - 2}`}
												className={classes.roundedChip}
											/>
										</Grid>
									)}
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</Grid>
			</Grid>
			<DeleteAlert
				open={props.openAlert}
				handleClose={props.handleCloseAlert}
				itemName={props.publication.title}
				itemId={props.publication.id}
				itemCategory="Publication"
				deleteItem={props.deletePublication}
			/>
		</>
	);
};

PublicationsTabView.displayName = 'PublicationsTabView';
PublicationsTabView.defaultProps = {};

export default React.memo(PublicationsTabView);
