import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { ReactComponent as BlueBorder } from '../../../../../assets/icons/blueBorder.svg';
import Contract from '../Contract/Contract';
import SendContractView from '../SendContractView/SendContractView';

import useStyles from './GeneralContractView.style';

const GeneralContractViewView = (props) => {
	const classes = useStyles();

	return (
		<Container className={classes.modalContainer}>
			<Grid item xs={10} className={classes.modalBox}>
				<Grid container justifyContent="center">
					<BlueBorder />
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.modalTitle}>
								{props.chosenCompany
									? props.chosenCompany?.name
									: JSON.parse(sessionStorage.getItem('company')).name}
								&apos;s Contract
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{props.step === 1 && (
					<Contract setStep={props.setStep} stepperMode setContractCopy={props.setContractCopy} />
				)}
				{props.step === 2 && (
					<SendContractView
						setStep={props.setStep}
						contractCopy={props.contractCopy}
						setContractCopy={props.setContractCopy}
					/>
				)}
			</Grid>
		</Container>
	);
};

GeneralContractViewView.displayName = 'GeneralContractViewView';
GeneralContractViewView.defaultProps = {};

export default React.memo(GeneralContractViewView);
