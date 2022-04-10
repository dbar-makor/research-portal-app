import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { ReactComponent as ContractIcon } from '../../../../../assets/icons/contract.svg';
import AutoCompleteUnit from '../../../reusables/AutoCompleteUnit/AutoCompleteUnit';
//import { OutlinedButton } from '../../../../../styles/MainStyles';
import ButtonRow from '../ButtonRow/ButtonRow';
import useStyles from './SendContractView.style';

const SendContractViewView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.formContainer}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12} className={classes.upperSection}>
						<ContractIcon />
						<Typography variant="h5" className={classes.mainTitle}>
							The Contract is Ready
							<Typography
								variant="caption"
								className={classes.pdfLink}
								onClick={props.presentPDFContract}
							>
								Visualize
							</Typography>
						</Typography>
					</Grid>
					<Divider className={classes.divider} />
					<Grid
						item
						xs={12}
						container
						direction="column"
						alignItems="center"
						className={classes.lowerSection}
					>
						<Grid item xs={9}>
							<Typography className={classes.question}>
								Whom do you want to send the contract to for signature?
							</Typography>
						</Grid>
						<Grid item xs={9} style={{ width: '75%' }}>
							<AutoCompleteUnit
								className={classes.textField}
								name="signer_user"
								fieldForLabel="name"
								label="Pick a member"
								options={
									props.chosenCompany
										? props.chosenCompany.members
										: JSON.parse(sessionStorage.getItem('company')).members
								}
								formObject={props.contractSigner}
								handler={props.handleChange}
								inputValue={props.signerInputValue}
								setInputValue={props.setSignerInputValue}
							/>
						</Grid>
					</Grid>
					<Divider className={classes.divider} />
				</Grid>
			</Grid>

			<Grid container>
				<ButtonRow
					validationResult={props.validationResult}
					handlerRight={props.handleDone}
					handlerLeft={props.handleExit}
					textButtonRight="Send Link"
					textButtonLeft="Not Now"
					style={{ position: 'absolute', bottom: 0 }}
				/>
			</Grid>
		</Grid>
	);
};

SendContractViewView.displayName = 'SendContractViewView';
SendContractViewView.defaultProps = {};

export default React.memo(SendContractViewView);
