import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import { useStyles } from '../../../styles/MainStyles';
import BellNotifications from '../topbarParts/BellNotifications/BellNotifications';
import UserIcon from '../topbarParts/UserIcon/UserIcon';
import TradingHourUnit from '../topbarParts/TradingHourUnit/TradingHourUnit';

// const StyledButton = withStyles(() => ({
// 	root: {
// 		'width': '185px',
// 		'height': '30px',
// 		'textTransform': 'none',
// 		'fontWeight': 400,
// 		'backgroundColor': '#1C67FF',
// 		'borderRadius': 21,
// 		'color': '#F2F2F2',
// 		'&:hover': {
// 			backgroundColor: '#1c67ffb3',
// 		},
// 	},
// }))(Button);

const LoginButton = withStyles(() => ({
	root: {
		'width': '122px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#ffffff',
		'borderRadius': 21,
		'color': '#000000',
		'&:hover': {
			backgroundColor: '#ffff',
		},
	},
}))(Button);

const TradingHoursView = forwardRef((props, ref) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.topTopWrapper}>
			<Grid item xs={9} container direction="row">
				{props.formattedData.map((item, key) => {
					return <TradingHourUnit key={key} item={item} classes={classes} />;
				})}
			</Grid>
			<Grid
				item
				xs={3}
				container
				alignItems="center"
				justifyContent="flex-end"
				className={classes.userBarWrapper}
			>
				{props.isAuthenticated ? (
					<>
						<Grid item xs={1}>
							<BellNotifications
								handleToggle={props.handleToggle}
								notifications={props.notifications}
								openNotification={props.openNotification}
								setOpenNotification={props.setOpenNotification}
								handleListKeyDown={props.handleListKeyDown}
								handleClose={props.handleClose}
							/>
						</Grid>
						<Grid item className={classes.userIconWrapper} xs={3}>
							<UserIcon
								ref={ref}
								handleToggle={props.handleToggle}
								userType={props.userType}
								handleClose={props.handleClose}
								setOpen={props.setOpen}
								open={props.open}
							/>
						</Grid>
					</>
				) : (
					<Grid item style={{ paddingRight: 80 }}>
						<Grid container justifyContent="space-between">
							{/* <Grid item style={{ paddingRight: 20 }}>
								<StyledButton>Become a Costumer</StyledButton>
							</Grid> */}
							<Grid item>
								<Link to="/login" style={{ textDecoration: 'none' }}>
									<LoginButton>Login</LoginButton>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
});

TradingHoursView.displayName = 'TradingHoursView';
TradingHoursView.defaultProps = {};

export default React.memo(TradingHoursView);
