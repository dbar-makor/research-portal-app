import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../../../styles/MainStyles';
import TableComponent from '../../reusables/TableComponent/TableComponent';
import CompanyInfo from '../companyDetails/CompanyInfo/CompanyInfo';
import MembersTable from '../membersDetails/MembersTable/MembersTable';
import { ReactComponent as Logo } from '../../../../assets/icons/makorLogoLarge.svg';

const MainSalesScreenView = (props) => {
	const classes = useStyles();

	return (
		<Grid container justifyContent="space-between">
			<Grid item xs={12}>
				<Grid container>
					{!props.loading ? (
						<Grid item xs={12}>
							{props.companiesData.length ? (
								<Grid container justifyContent="space-between">
									<Grid
										container
										item
										xs={12}
										xl={6}
										className={classes.scrollableTableContainer}
									>
										<TableComponent
											data={props.companiesData}
											pageType="companies"
											ref={props.lastItemRef}
										/>
									</Grid>
									{props.chosenCompany ? (
										<Grid
											item
											container
											xs={12}
											lg={6}
											style={{ padding: '0px 16px 0px 16px' }}
										>
											<Grid item xs={12}>
												<CompanyInfo />
											</Grid>
											<Grid item xs={12}>
												<MembersTable />
											</Grid>
										</Grid>
									) : (
										<Grid item xs={12} lg={5} className={classes.rightHalf}>
											<Grid
												container
												alignItems="center"
												justifyContent="center"
												direction="column"
												className={classes.logoBox}
											>
												<Logo />
												<Typography variant="h3" className={classes.prompt}>
													{' '}
													Choose a Company
												</Typography>
											</Grid>
										</Grid>
									)}
								</Grid>
							) : (
								<Grid container>
									<Grid item xs={6}>
										<Typography className={classes.noMatches}>
											No matches found
										</Typography>
									</Grid>
								</Grid>
							)}
						</Grid>
					) : (
						<Grid item xs={12}>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								className={classes.progressBarContainer}
							>
								<CircularProgress className={classes.progressBar} />
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

MainSalesScreenView.displayName = 'MainSalesScreenView';
MainSalesScreenView.defaultProps = {};

export default React.memo(MainSalesScreenView);
