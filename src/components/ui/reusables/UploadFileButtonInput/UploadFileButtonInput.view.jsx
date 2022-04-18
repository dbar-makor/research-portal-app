import React from 'react';
import { Typography, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { DeleteButton } from '../../../../styles/MainStyles';
import { ReactComponent as FileUpload } from '../../../../assets/icons/fileUpload.svg';
import useStyles from './UploadFileButtonInput.style';

const UploadFileButtonInput = (props) => {
	const classes = useStyles();
	// A variable controlling whether button should be disabled
	const selectedValue = props.selectedValue ? props.selectedValue : null;

	return (
		<>
			<input
				type="file"
				accept={props.acceptedFileTypes}
				className={classes.input}
				disabled={selectedValue === props.nonDefaultValue}
				placeholder={props.placeholder}
				id="raised-button-file"
				onChange={(e) => {
					// Allows choosing again a deleted file, together with onClick (default behavior disallows it)
					this?.readFile(e);

					return props.handleUpload(e);
				}}
				onClick={(e) => (e.target.value = null)}
			/>
			<label htmlFor="raised-button-file">
				<Button variant="outlined" component="span" className={classes.pdfbtn}>
					{props.formObject[props.propertyName] ? (
						<>
							{props.shortify(props.formObject[props.propertyName])}
							<DeleteButton disableRipple onClick={props.handleDelete}>
								<ClearIcon className={classes.clearIcon} />
							</DeleteButton>
						</>
					) : (
						<>
							Upload PDF
							<FileUpload
								className={selectedValue === 'pdf' ? classes.arrow2Style : classes.arrowStyle}
							/>
						</>
					)}
				</Button>
				{!!props.errors[props.propertyName] && (
					<Typography
						variant="caption"
						className={classes.customError}
						style={{ marginLeft: '14px' }}
					>
						{props.errors[props.propertyName]}
					</Typography>
				)}
			</label>
		</>
	);
};

UploadFileButtonInput.displayName = 'uploadFileButtonInputView';
UploadFileButtonInput.defaultProps = {};

export default React.memo(UploadFileButtonInput);
