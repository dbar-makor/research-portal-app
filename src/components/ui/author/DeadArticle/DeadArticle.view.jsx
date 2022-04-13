import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import SubHeader from '../../reusables/SubHeader/SubHeader';
import { useStyles, AtricleTitleTextField } from '../../../../styles/AuthorsStyles';
import { ReactComponent as FileUpload } from '../../../../assets/icons/fileUpload.svg';
import { ReactComponent as InsertLink } from '../../../../assets/icons/insertLink.svg';
import {
	DeleteButton,
	StyledTextField,
	AddButton,
	OutlinedButton,
	FilledButton,
} from '../../../../styles/MainStyles';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/iconCalendar.svg';
import DropZone from '../../reusables/DropZone/DropZone';
import CategoriesAutoComplete from '../../reusables/CategoriesAutoComplete/CategoriesAutoComplete';
import TagsAutoComplete from '../../reusables/TagsAutoComplete/TagsAutoComplete';
import { selectChosenResearch } from '../../../../redux/researches/chosenResearchSlice';
import ExitPublicationAlert from '../../reusables/ExitPublicationAlert/ExitPublicationAlert';

//import useStyles from './DeadArticle.style';

const DeadArticleView = forwardRef((props, ref) => {
	const chosenResearch = useSelector(selectChosenResearch);

	const classes = useStyles();

	return (
		<Grid container justifyContent="center" className={classes.newArticleWrapper}>
			<Grid item xs={10} className={classes.newArticleContainer}>
				<SubHeader title="Upload Research" />
			</Grid>

			<Grid
				item
				xs={12}
				style={{
					backgroundColor: '#fff',
					width: '812px',
					position: 'absolute',
					top: '15vh',
					left: '30vw',
					alignItems: 'center',
					borderRadius: '8px',
					border: '1px solid #EDEFF3',
					padding: '37px 138px',
				}}
			>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							style={{
								color: '#0F0F0F',
								fontFamily: 'inter',
								fontWeight: 500,
								fontSize: '20px',
								textTransform: 'capitalize',
								marginBottom: '16px',
							}}
						>
							information
						</Typography>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ marginBottom: '16px' }}>
						<AtricleTitleTextField
							variant="outlined"
							value={props.localForm.title}
							placeholder="Article Title*"
							error={!!props.errors.title}
							helpertext={props.errors.title}
							inputProps={{
								style: { fontSize: '16px', fontWeight: 500, color: '#868DA2' },
							}}
							onChange={(e) => props.handleChange(e.target.value, 'title')}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ marginBottom: '24px' }}>
						<AtricleTitleTextField
							multiline
							minRows={3}
							maxRows={3}
							className={classes.descriptionStyle}
							variant="outlined"
							value={props.localForm.description}
							placeholder="Description*"
							error={!!props.errors.description}
							helperText={props.errors.description}
							inputProps={{
								style: {
									fontSize: '16px',
									fontWeight: 500,
									color: '#868DA2',
									lineHeight: 1.5,
									overflow: 'auto',
									cursor: 'text',
									padding: 0,
								},
								maxLength: 500,
							}}
							onChange={(e) => props.handleChange(e.target.value, 'description')}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={3}>
								<Typography
									style={{
										color: '#868DA2',
										fontWeight: 500,
										fontFamily: 'inter',
									}}
								>
									Cover Image
								</Typography>
							</Grid>
							<Grid item xs={9} style={{ marginBottom: 10 }}>
								<DropZone
									className={classes.dropZone}
									uploadedImage={props.coverImage}
									setUploadedImage={props.setCoverImage}
									purpose="cover image*"
									fileOK={props.coverImageOK}
									setFileOK={props.setCoverImageOK}
									onDrop={props.onDropCover}
								/>
								{!props.coverImageOK.initial && (
									<Typography variant="caption" className={classes.customError}>
										This field is required
									</Typography>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={6} style={{ paddingRight: 10 }}>
								<CategoriesAutoComplete
									formObject={props.localCats}
									setFormObject={props.setLocalCats}
									handler={props.handleCatsChange}
									error={props.errors.categories}
									errors={props.errors}
									setErrors={props.setErrors}
									validationResult={props.validationResult}
									setValidationResult={props.setValidationResult}
									type="dead_publication"
								/>
							</Grid>

							<Grid item xs={6} style={{ paddingLeft: 10 }}>
								<TagsAutoComplete
									formObject={props.localTags}
									setFormObject={props.setLocalTags}
									handler={props.handleTagsValue}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ paddingTop: '25px' }}>
						<Divider className={classes.divider} />
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							style={{
								color: '#0F0F0F',
								fontFamily: 'inter',
								fontWeight: 500,
								fontSize: '20px',
								textTransform: 'capitalize',
								marginTop: '16px',
							}}
						>
							Add Events
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container className={`${classes.marginTop15} ${classes.eventsScrolledContainer}`}>
						<Grid item xs={12}>
							<Grid
								container
								className={classes.eventContainer}
								alignItems="center"
								justifyContent="space-between"
							>
								<Grid item xs={6} style={{ paddingRight: 10 }}>
									<StyledTextField
										value={props.currentEvent.title}
										error={!!props.errorsEvent.title}
										helpertext={props.errorsEvent.title}
										variant="outlined"
										placeholder="Title"
										className={classes.textField}
										inputProps={{
											maxLength: 50,
										}}
										onChange={(e) => {
											props.setCurrentEvent({
												...props.currentEvent,
												title: e.target.value,
											});
											props.validateEvent(
												{ title: e.target.value },
												props.errorsEvent,
												props.setErrorsEvent,
												props.setValidationResultEvent,
											);
										}}
									/>
								</Grid>
								<Grid item xs={5} style={{ paddingLeft: 10 }}>
									<KeyboardDatePicker
										autoOk
										orientation="portrait"
										disableToolbar
										variant="inline"
										inputVariant="outlined"
										format="dd/MM/yyyy"
										placeholder="Date"
										error={!!props.errorsEvent.date}
										helperText={props.errorsEvent.date}
										value={props.currentEvent.date}
										className={classes.eventDatePicker}
										InputAdornmentProps={{ position: 'end' }}
										keyboardIcon={<CalendarIcon className={classes.calendarIcon} />}
										PopoverProps={{
											classes: { paper: classes.calendarPaper },
										}}
										onChange={(date) => {
											props.setCurrentEvent({ ...props.currentEvent, date: date });
											props.validateEvent(
												{ date: date },
												props.errorsEvent,
												props.setErrorsEvent,
												props.setValidationResultEvent,
											);
										}}
									/>
								</Grid>

								<Grid item xs={1} style={{ textAlignLast: 'right' }}>
									<AddButton
										disableRipple
										disabled={!props.ifCurrentEventFilled}
										onClick={props.addEvent}
									>
										<AddIcon
											className={clsx(classes.addIcon, {
												[classes.addIconDisabled]: !props.ifCurrentEventFilled,
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
										ref={(el) => (ref.current[index] = el)}
									>
										<Grid item xs={6} style={{ paddingRight: 10 }}>
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
										<Grid item xs={5} style={{ paddingLeft: 10 }}>
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
													props.localForm.events[index].date ? null : (
														<CalendarIcon className={classes.calendarIcon} />
													)
												}
												style={{ width: '100%', maxHeight: '53px' }}
												PopoverProps={{
													classes: { paper: classes.calendarPaper },
												}}
												onChange={(date) =>
													props.updatePropertyField(index, date, 'date', 'events')
												}
											/>
										</Grid>
										<Grid item xs={1} style={{ textAlignLast: 'right' }}>
											<DeleteButton
												disableRipple
												onClick={() => props.deleteItem(index, 'events')}
											>
												<ClearIcon className={classes.clearIcon} />
											</DeleteButton>
										</Grid>
									</Grid>
								))}
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} style={{ padding: '10px 0 15px 0' }}>
						<Divider className={classes.divider} />
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<>
								<Grid
									item
									xs={6}
									style={{
										color: '#868DA2',
										fontSize: '20px',
										fontFamily: 'inter',
										paddingRight: 10,
									}}
								>
									<Radio
										checked={props.selectedValue === 'pdf'}
										value="pdf"
										color="default"
										className={
											props.selectedValue === 'pdf'
												? classes.radioStyle
												: classes.disabledRadio
										}
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'pdf' }}
										onChange={props.handleChangeRadio}
									/>
									Upload PDF
									<AtricleTitleTextField
										variant="outlined"
										style={{ marginBottom: '16px', marginTop: 5 }}
										value={props.localForm.title_pdf || ''}
										placeholder="Title"
										disabled={props.selectedValue === 'video'}
										error={!!props.errors.title_pdf}
										helperText={props.errors.title_pdf}
										inputProps={{
											helperTextcolor: props.selectedValue === 'video' ? 'grey' : 'red',
											style: {
												fontSize: '16px',
												fontWeight: 500,
												color: '#0F0F0F',
											},
										}}
										onChange={(e) => props.handleChange(e.target.value, 'title_pdf')}
									/>
									<input
										type="file"
										accept=".pdf"
										style={{ marginBottom: '48px', display: 'none' }}
										disabled={props.selectedValue === 'video'}
										placeholder="Upload PDF"
										id="raised-button-file"
										onChange={(e) => props.onPDFUpload(e)}
									/>
									<label htmlFor="raised-button-file">
										<Button
											variant="outlined"
											component="span"
											className={classes.pdfbtn}
										>
											{props.localForm.file_pdf ? (
												<>
													{props.shortify(props.localForm.file_pdf)}
													<DeleteButton
														disableRipple
														onClick={() => {
															props.setLocalForm(() => ({
																...props.localForm,
																title_pdf: '',
																file_pdf: '',
															}));

															if (!props.deadArticleId) {
																const localStorageDeadArticle =
																	localStorage.getItem('deadArticle');

																const deadArticle =
																	JSON.parse(localStorageDeadArticle);

																// Removing PDF file & PDF title from localStorage
																delete deadArticle.file_pdf;
																delete deadArticle.title_pdf;

																localStorage.setItem(
																	'deadArticle',
																	JSON.stringify(deadArticle),
																);
															}

															if (chosenResearch) {
																props.validateEditedDeadPublication(
																	{ file_pdf: props.localForm.title_pdf },
																	props.errors,
																	props.setErrors,
																	props.setValidationResult,
																	props.selectedValue,
																);
															} else {
																props.validateDeadPublication(
																	{ file_pdf: props.localForm.title_pdf },
																	props.errors,
																	props.setErrors,
																	props.setValidationResult,
																	props.selectedValue,
																);
															}
														}}
													>
														<ClearIcon className={classes.clearIcon} />
													</DeleteButton>
												</>
											) : (
												<>
													Upload PDF
													<FileUpload
														className={
															props.selectedValue === 'pdf'
																? classes.arrow2Style
																: classes.arrowStyle
														}
													/>
												</>
											)}
										</Button>
										{!!props.errors.file_pdf && (
											<Typography
												variant="caption"
												className={classes.customError}
												style={
													props.selectedValue === 'video'
														? { color: '#868DA2' }
														: {}
												}
											>
												{props.errors.file_pdf}
											</Typography>
										)}
									</label>
								</Grid>

								<Grid
									item
									xs={6}
									style={{
										color: '#868DA2',
										fontSize: '20px',
										fontFamily: 'inter',
										paddingLeft: 10,
									}}
								>
									<Radio
										checked={props.selectedValue === 'video'}
										value="video"
										name="radio-button-demo"
										color="default"
										className={
											props.selectedValue === 'video'
												? classes.radioStyle
												: classes.disabledRadio
										}
										inputProps={{ 'aria-label': 'B' }}
										onChange={props.handleChangeRadio}
									/>
									Video Link
									<AtricleTitleTextField
										variant="outlined"
										disabled={props.selectedValue === 'pdf'}
										style={{
											marginBottom: '16px',
											marginTop: 5,
										}}
										value={props.localForm.title_video}
										error={!!props.errors.title_video}
										helperText={props.errors.title_video}
										placeholder="Title"
										inputProps={{
											style: {
												fontSize: '16px',
												fontWeight: 400,
												color: '#0F0F0F',
											},
										}}
										onChange={(e) => props.handleChange(e.target.value, 'title_video')}
									/>
									<AtricleTitleTextField
										variant="outlined"
										disabled={props.selectedValue === 'pdf'}
										style={{ marginBottom: '76px' }}
										value={props.localForm.link_video}
										error={!!props.errors.link_video}
										helperText={props.errors.link_video}
										placeholder="Insert Link"
										InputProps={{
											startAdornment: (
												<InsertLink
													className={
														props.selectedValue === 'video'
															? classes.linkStyle
															: classes.link2Style
													}
												/>
											),
										}}
										inputProps={{
											style: {
												fontSize: '16px',
												fontWeight: 400,
												color: '#0F0F0F',
											},
										}}
										onChange={(e) => props.handleChange(e.target.value, 'link_video')}
									/>
								</Grid>
							</>
						</Grid>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={3}>
								<Button className={classes.cancelStyle} onClick={props.handleCancle}>
									cancel
								</Button>
							</Grid>
							<Grid item xs={3}>
								{((chosenResearch && chosenResearch.status === 'draft') ||
									!chosenResearch) && (
									<OutlinedButton
										className={classes.saveDraft}
										onClick={() => props.sendPublication('save-draft')}
									>
										Save Draft
									</OutlinedButton>
								)}
							</Grid>
							<Grid item xs={3}>
								<Link to="/prearticle" target="_blank">
									<OutlinedButton
										className={classes.saveDraft}
										onClick={() => props.sendPublication('preview')}
									>
										Preview
									</OutlinedButton>
								</Link>
							</Grid>
							<Grid item xs={3}>
								<FilledButton
									disabled={
										!props.validationResult ||
										!props.validationResultEvent ||
										!props.coverImageOK.final
									}
									className={classes.publishStyle}
									onClick={() => props.sendPublication('done')}
								>
									Publish
								</FilledButton>
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
	);
});

DeadArticleView.displayName = 'DeadArticleView';
DeadArticleView.defaultProps = {};

export default React.memo(DeadArticleView);
