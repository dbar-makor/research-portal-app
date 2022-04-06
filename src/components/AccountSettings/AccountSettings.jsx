import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BlueShape } from '../../assets/icons/blueBorder.svg';
import { useStyles } from '../../styles/AccountSettingsStyles';
import EditProfile from '../ui/reusables/EditProfile/EditProfile';
import Settings from '../ui/reusables/Settings/Settings';
import PrivateRoute from '../layout/PrivateRoute/PrivateRoute';
import * as actionAuth from '../../redux/auth/action';
import ContractAndTrails from './ContractsAndTrails';

const AccountSettings = () => {
	const userContent = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();
	const chosenRouteName = window.location.pathname.replace('/settings/', '');
	const history = useHistory();
	const classes = useStyles(chosenRouteName === 'contract_trails' ? 'on' : 'off');
	const { path, url } = useRouteMatch('/settings');

	const handleRoute = (type) => {
		history.push(`${url}/${type}`);
	};

	const handleLogout = () => {
		dispatch(actionAuth.logout());
	};

	return (
		<Grid container className={classes.page}>
			<Grid item container direction="column" xs={3} className={classes.pageTitle}>
				<BlueShape />
				<Typography style={{ fontSize: 24, color: '#868DA2' }}>Account Settings</Typography>
			</Grid>
			<Grid container item xs={6} direction="row" className={classes.contentBox}>
				<Grid className={classes.sideBarWrapper} item xs={3}>
					<Grid container justifyContent="space-between" className={classes.sideBar}>
						<Grid item container xs={12} className={classes.upperSection}>
							<Grid item container xs={12} justifyContent="center" alignItems="center">
								<Grid item xs={3}>
									<Avatar className={classes.avatar} src={`${userContent.avatar}`} />
								</Grid>
								<Grid item xs={8}>
									<Typography>{userContent.name}</Typography>
								</Grid>
							</Grid>
							<Grid item container className={classes.links}>
								<Grid
									item
									xs={12}
									className={
										chosenRouteName === 'edit' ? classes.chosenRoute : classes.notChosen
									}
									onClick={() => handleRoute('edit')}
								>
									<Grid container alignItems="center">
										<Grid item>
											<PersonIcon
												className={
													chosenRouteName === 'edit' ? classes.iconOn : classes.icon
												}
											/>
										</Grid>
										<Grid item>
											<Typography style={{ fontSize: 14 }}>Edit Profile</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid
									item
									xs={12}
									className={
										chosenRouteName === 'settings'
											? classes.chosenRoute
											: classes.notChosen
									}
									onClick={() => handleRoute('settings')}
								>
									<Grid container alignItems="center">
										<Grid item>
											<SettingsIcon
												className={
													chosenRouteName === 'settings'
														? classes.iconOn
														: classes.icon
												}
											/>
										</Grid>
										<Grid item>
											<Typography style={{ fontSize: 14 }}>Setdtings</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid
									item
									xs={12}
									className={
										chosenRouteName === 'contract_trails'
											? classes.chosenRoute
											: classes.notChosen
									}
									onClick={() => handleRoute('contract_trails')}
								>
									<Grid container alignItems="center">
										<Grid item>
											<InsertDriveFileIcon
												className={
													chosenRouteName === 'contract_trails'
														? classes.iconOn
														: classes.icon
												}
											/>
										</Grid>
										<Grid item>
											<Typography style={{ fontSize: 14 }}>
												Contracts & Trials
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							xs={12}
							justifyContent="flex-end"
							alignItems="center"
							className={classes.bottomSection}
						>
							<Grid item xs={12}>
								<Divider className={classes.divider} />
								<Typography className={classes.logout} onClick={handleLogout}>
									<ExitToAppIcon />
									Logout
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={9} className={classes.container}>
					<Switch>
						<PrivateRoute path={`${path}/settings`} component={Settings} />
						<PrivateRoute path={`${path}/edit`} component={EditProfile} />
						<PrivateRoute path={`${path}/contract_trails`} component={ContractAndTrails} />
					</Switch>
				</Grid>
			</Grid>
		</Grid>
	);
};

AccountSettings.displayName = 'AccountSettings';

export default AccountSettings;
