import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Divider } from '@material-ui/core';
import MUIRichTextEditor from 'mui-rte';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import clsx from 'clsx';
import { useStyles, AtricleTitleTextField } from '../../../../styles/AuthorsStyles';
import SubHeader from '../../reusables/SubHeader/SubHeader';
import {
	StyledTextField,
	OutlinedButton,
	FilledButton,
	AddButton,
	DeleteButton,
} from '../../../../styles/MainStyles';
import DropZone from '../../reusables/DropZone/DropZone';
import DropZoneMulti from '../../reusables/DropZoneMulti/DropZoneMulti';
import CategoriesAutoComplete from '../../reusables/CategoriesAutoComplete/CategoriesAutoComplete';
import TagsAutoComplete from '../../reusables/TagsAutoComplete/TagsAutoComplete';
import SelectFormControl from '../../reusables/SelectFormControl/SelectFormControl';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import ExitPublicationAlert from '../../reusables/ExitPublicationAlert/ExitPublicationAlert';
import { validateLivePublication } from '../../../../utils/helpers/validationFunctions';

const regions = [
	{ name: 'Asia-Pacific', value: 'Asia-Pacific' },
	{ name: 'Europe', value: 'Europe' },
	{ name: 'United States', value: 'United-States' },
];

const AuthorsNewArticleView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="center" style={{ paddingTop: 20 }}>
			<Grid item xs={11} lg={10}>
				<Grid item container className={classes.newArticleContainer}>
					<SubHeader title="Write New Article" />
					<Grid item xs={12} md={6}>
						<Grid container className={classes.newArticleLeftContainer}>
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="flex-end" />
							</Grid>
							<Grid item xs={12}>
								<Grid container justifyContent="space-between" alignItems="flex-end">
									<Grid item xs={12}>
										<Grid
											container
											className={classes.marginBottom25}
											justifyContent="space-between"
										>
											<Grid item xs={12}>
												<AtricleTitleTextField
													variant="outlined"
													value={props.localForm.title}
													className={classes.articleTitleLive}
													placeholder="Article Title*"
													error={!!props.errors.title}
													helperText={props.errors.title}
													inputProps={{
														style: { fontSize: '32px', fontWeight: 600 },
														maxLength: 50,
													}}
													onChange={(e) =>
														props.handleChange(e.target.value, 'title')
													}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={12}>
										<MUIRichTextEditor
											className={
												props.showEditorError
													? `${classes.muiEditor} ${classes.editorError}`
													: `${classes.muiEditor}`
											}
											inlineToolbar
											label="Enter article body...*"
											onChange={props.handleEditorChange}
											onFocus={props.handleEditorOnFocus}
											{...(props.chosenResearch &&
											Object.values(props.chosenResearch.content).length > 0
												? {
														defaultValue:
															typeof props.chosenResearch.content !== 'string'
																? JSON.stringify(props.chosenResearch.content)
																: props.chosenResearch.content,
												  }
												: props.storageDefaultContent?.blocks?.some((block) => {
														return block.text !== '';
												  }) && {
														defaultValue:
															typeof props.storageDefaultContent !== 'string'
																? JSON.stringify(props.storageDefaultContent)
																: props.storageDefaultContent,
												  })}
											controls={[
												'bold',
												'italic',
												'underline',
												'strikethrough',
												'highlight',
												'link',
												'numberList',
												'bulletList',
												'quote',
											]}
											customControls={[
												{
													name: 'upload-image',
													icon: <InsertPhotoIcon />,
													type: 'callback',
												},
											]}
										/>
									</Grid>
									{props.contentNotOK.focus &&
										props.contentNotOK.everTyped &&
										!props.contentNotOK.isText && (
											<Grid item xs={6} style={{ color: 'red', marginLeft: 8 }}>
												This field is required
											</Grid>
										)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={4}>
						<Grid container className={classes.newArticleRightContainer}>
							<Grid item xs={12} container className={classes.rightForm}>
								<Grid item xs={12}>
									<Grid container>
										<Grid item xs={12} xl={3}>
											<Typography className={classes.subHeaderRight}>
												Information
											</Typography>
										</Grid>
										<Grid item xs={12} xl={9}>
											<Grid
												container
												className={classes.imgWrapper}
												direction="column"
												justifyContent="center"
											>
												<DropZone
													className={classes.dropZone}
													fileTypes=".png, .jpg, .svg, .jfif, .webp"
													uploadedImage={props.coverImage}
													setUploadedImage={props.setCoverImage}
													purpose="cover image*"
													fileOK={props.coverImageOK}
													setFileOK={props.setCoverImageOK}
													onDrop={props.onDropCover}
												/>
												{!props.coverImageOK.initial && (
													<Typography
														variant="caption"
														className={classes.customError}
													>
														This field is required
													</Typography>
												)}
											</Grid>
											<Grid
												container
												direction="column"
												className={classes.autoCompletesContainer}
											>
												<SelectFormControl
													value={props.localForm.region || ''}
													placeholder="Relevant Regions"
													valueField="value"
													optionsArray={regions}
													labelField="name"
													onChange={(e) =>
														props.handleChange(e.target.value, 'region')
													}
												/>
												<CategoriesAutoComplete
													formObject={props.localCats}
													setFormObject={props.setLocalCats}
													handler={props.handleCatsChange}
													error={props.errors.categories}
													errors={props.errors}
													setErrors={props.setErrors}
													validationResult={props.validationResult}
													setValidationResult={props.setValidationResult}
													validationFunction={validateLivePublication}
													type="live_publication"
												/>
												<TagsAutoComplete
													className={classes.tagsInputContainer}
													formObject={props.localTags}
													setFormObject={props.setLocalTags}
													handler={props.handleTagsValue}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>

								<Divider className={classes.divider} />
								<Grid item xs={12}>
									<Grid
										container
										className={`${classes.marginTop15} ${classes.eventsScrolledContainer}`}
									>
										<Grid item xs={12} xl={3}>
											<Typography className={classes.subHeaderRight}>Events</Typography>
										</Grid>
										<Grid item xs={12} xl={9}>
											<Grid
												container
												className={classes.eventContainer}
												alignItems="center"
												justifyContent="space-between"
											>
												<Grid item xs={5}>
													<StyledTextField
														value={props.currentEvent.title}
														variant="outlined"
														placeholder="Title"
														className={classes.textField}
														inputProps={{
															maxLength: 50,
														}}
														onChange={(e) =>
															props.handleEvent(e.target.value, 'title')
														}
													/>
												</Grid>
												<Grid item xs={5}>
													<KeyboardDatePicker
														autoOk
														orientation="portrait"
														disableToolbar
														variant="inline"
														inputVariant="outlined"
														format="dd/MM/yyyy"
														placeholder="Date"
														value={props.currentEvent.date}
														className={classes.eventDatePicker}
														InputAdornmentProps={{ position: 'end' }}
														keyboardIcon={
															<CalendarIcon className={classes.calendarIcon} />
														}
														PopoverProps={{
															classes: { paper: classes.calendarPaper },
														}}
														onChange={(date) => props.handleEvent(date, 'date')}
													/>
												</Grid>

												<Grid item xs={1}>
													<AddButton
														disableRipple
														disabled={!props.ifCurrentEventFilled}
														onClick={props.addEvent}
													>
														<AddIcon
															className={clsx(classes.addIcon, {
																[classes.addIconDisabled]:
																	!props.ifCurrentEventFilled,
															})}
														/>
													</AddButton>
												</Grid>
											</Grid>
											{props.localForm &&
												props.localForm.events &&
												props.localForm.events.map((event, index) => (
													<Grid
														container
														className={classes.eventContainer}
														alignItems="center"
														justifyContent="space-between"
														key={index}
														ref={(el) =>
															(props.tableRowsRefs.current[index] = el)
														}
													>
														<Grid item xs={5}>
															<StyledTextField
																value={event.title}
																variant="outlined"
																placeholder="Title"
																className={classes.textField}
																inputProps={{
																	maxLength: 50,
																}}
																onChange={(e) =>
																	props.updatePropertyField(
																		index,
																		e.target.value,
																		'title',
																		'events',
																	)
																}
															/>
														</Grid>
														<Grid item xs={5}>
															<KeyboardDatePicker
																autoOk
																orientation="portrait"
																disableToolbar
																variant="inline"
																inputVariant="outlined"
																format="dd/MM/yyyy"
																placeholder="Date"
																value={event.date}
																className={classes.eventDatePicker}
																InputAdornmentProps={{ position: 'end' }}
																keyboardIcon={
																	props.localForm.events[index]
																		.date ? null : (
																		<CalendarIcon
																			className={classes.calendarIcon}
																		/>
																	)
																}
																style={{ width: '100%', maxHeight: '53px' }}
																PopoverProps={{
																	classes: { paper: classes.calendarPaper },
																}}
																onChange={(date) =>
																	props.updatePropertyField(
																		index,
																		date,
																		'date',
																		'events',
																	)
																}
															/>
														</Grid>
														<Grid item xs={1}>
															<DeleteButton
																disableRipple
																onClick={() =>
																	props.deleteItem(index, 'events')
																}
															>
																<ClearIcon className={classes.clearIcon} />
															</DeleteButton>
														</Grid>
													</Grid>
												))}
										</Grid>
									</Grid>
								</Grid>

								<Divider className={classes.divider} />

								<Grid item xs={12}>
									<Grid container className={classes.marginTop15}>
										<Grid item xs={12} xl={3}>
											<Typography className={classes.subHeaderRight}>
												Attachments
											</Typography>
										</Grid>
										<Grid item xs={12} xl={9}>
											<DropZoneMulti
												className={classes.uploadAttachment}
												fileTypes=".jpg, .png, .svg, .doc, .docx, .pdf"
												purpose="your files"
												localForm={props.localForm}
												deleteItem={props.deleteItem}
												onDrop={props.onDrop}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid
								item
								xs={12}
								container
								justifyContent="space-between"
								alignItems="center"
								className={classes.buttonsContainer}
							>
								<Grid item container md={3} lg={12} xl={3} justifyContent="center">
									{((props.chosenResearch && props.chosenResearch.status === 'draft') ||
										!props.chosenResearch) && (
										<Typography
											variant="caption"
											className={classes.draftLink}
											onClick={() => props.sendPublication('save-draft')}
										>
											Save Draft
										</Typography>
									)}
								</Grid>
								<Grid
									item
									container
									md={7}
									lg={12}
									xl={7}
									justifyContent="space-between"
									className={classes.duoButtons}
								>
									<Grid item>
										<Link
											to="/prearticle"
											target="_blank"
											className={classes.previewLink}
										>
											<OutlinedButton
												className={classes.previewBtn}
												onClick={() => props.sendPublication('preview')}
											>
												Preview
											</OutlinedButton>
										</Link>
									</Grid>
									<Grid item>
										<FilledButton
											disabled={!props.isPublishable}
											className={classes.publishBtn}
											onClick={() => props.sendPublication('done')}
										>
											Publish
										</FilledButton>
									</Grid>
								</Grid>
								<ExitPublicationAlert
									open={props.openAlert}
									setNavigationAllowed={props.setNavigationAllowed}
									handleClose={props.handleCloseAlert}
									alertDeleteHandler={props.alertDeleteHandler}
									sendPublication={props.sendPublication}
									requestedLocation={props.requestedLocation}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

AuthorsNewArticleView.displayName = 'AuthorsNewArticleView';
AuthorsNewArticleView.defaultProps = {};

export default React.memo(AuthorsNewArticleView);
