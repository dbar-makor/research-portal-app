import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BlueShape } from '../../assets/icons/blueBorder.svg';
import { useStyles } from '../../styles/AccountSettingsStyles';
import EditProfile from '../ui/reusables/EditProfile/EditProfile';
import Settings from '../ui/reusables/Settings/Settings';
import * as actionAuth from '../../redux/auth/action';
import { changeSettingsTab } from '../../redux/tabs/tabsSlice';
import ContractAndTrails from './ContractsAndTrails';

const AccountSettings = () => {
	const userContent = useSelector((state) => state.auth.userContent);
	const settingsTab = useSelector((state) => state.tabs.settingsTab);
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleChange = (tab) => {
		dispatch(changeSettingsTab(tab));
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
									className={settingsTab === 0 ? classes.chosenRoute : classes.notChosen}
									onClick={() => handleChange(0)}
								>
									<Grid container alignItems="center">
										<Grid item>
											<PersonIcon
												className={settingsTab === 0 ? classes.iconOn : classes.icon}
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
									className={settingsTab === 1 ? classes.chosenRoute : classes.notChosen}
									onClick={() => handleChange(1)}
								>
									<Grid container alignItems="center">
										<Grid item>
											<SettingsIcon
												className={settingsTab === 1 ? classes.iconOn : classes.icon}
											/>
										</Grid>
										<Grid item>
											<Typography style={{ fontSize: 14 }}>Settings</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid
									item
									xs={12}
									className={settingsTab === 2 ? classes.chosenRoute : classes.notChosen}
									onClick={() => handleChange(2)}
								>
									<Grid container alignItems="center">
										<Grid item>
											<InsertDriveFileIcon
												className={settingsTab === 2 ? classes.iconOn : classes.icon}
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
					{settingsTab === 0 && <EditProfile />}
					{settingsTab === 1 && <Settings />}
					{settingsTab === 2 && <ContractAndTrails />}
				</Grid>
			</Grid>
		</Grid>
	);
};

AccountSettings.displayName = 'AccountSettings';

export default AccountSettings;
