import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Grid, Toolbar, withStyles, Divider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import TradingHours from '../TradingHours/TradingHours';
import MemberTopbar from '../topbarParts/MemberTopbar/MemberTopbar';
import SalesTopbar from '../topbarParts/SalesTopbar/SalesTopbar';
import AuthorTopbar from '../topbarParts/AuthorTopbar/AuthorTopbar';
import AdminTopbar from '../topbarParts/AdminTopbar/AdminTopbar';
import MakorLogo from '../topbarParts/MakorLogo/MakorLogo';

import useStyles from './TopBar.style';

const StyledButton = withStyles(() => ({
	root: {
		'width': '185px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#1C67FF',
		'borderRadius': 21,
		'color': '#F2F2F2',
		'&:hover': {
			backgroundColor: '#1c67ffb3',
		},
	},
}))(Button);

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

const TopBarView = forwardRef((props, ref) => {
	const classes = useStyles();

	function ElevationScroll(props) {
		const { children, window } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
			target: window ? window() : undefined,
		});

		return React.cloneElement(children, {
			elevation: trigger ? 4 : 0,
		});
	}

	ElevationScroll.propTypes = {
		children: PropTypes.element.isRequired,
		window: PropTypes.func,
	};

	const handleBarOptions = (userType) => {
		switch (userType) {
			case 'client' || 'prospect':
				return <MemberTopbar classes={classes} options={props.options} />;
			case 'sales':
				return <SalesTopbar classes={classes} />;
			case 'author':
				return <AuthorTopbar classes={classes} />;
			case 'admin':
				return (
					<AdminTopbar
						handleToggle={props.handleToggle}
						classes={classes}
						openUserMgmt={props.openUserMgmt}
						setOpenUserMgmt={props.setOpenUserMgmt}
						userType={userType}
						handleClose={props.handleClose}
					/>
				);
		}
	};

	return (
		<Grid container direction="column" className={`${classes.headerContainer} header`}>
			<Grid item xs={12} style={{ backgroundColor: '#000', width: '70vw', margin: '0 auto' }}>
				<TradingHours
					handleToggle={props.handleToggle}
					notifications={props.notifications}
					openNotification={props.openNotification}
					setOpenNotification={props.setOpenNotification}
					handleListKeyDown={props.handleListKeyDown}
					handleClose={props.handleClose}
					ref={ref}
					userType={props.userType}
					setOpen={props.setOpen}
					open={props.open}
				/>
			</Grid>
			<Divider className={classes.divider} />
			<Grid container item justifyContent="center" className={classes.barWrapper}>
				<Grid item xs={9}>
					<CssBaseline />
					<ElevationScroll {...props}>
						<AppBar position="sticky" className={classes.header}>
							<Toolbar style={{ minHeight: '6vh', height: '6vh', width: '100%' }}>
								<Grid item xs={4} style={{ marginLeft: '27px' }}>
									<MakorLogo classes={classes} userType={props.userType} />
								</Grid>
								{props.isAuthenticated ? (
									<Grid item xs={8}>
										{handleBarOptions(props.userType)}
									</Grid>
								) : (
									<Grid item style={{ paddingRight: 80 }}>
										<Grid container justifyContent="space-between">
											<Grid item style={{ paddingRight: 20 }}>
												<StyledButton>Become a Costumer</StyledButton>
											</Grid>
											<Grid item>
												<LoginButton>Login</LoginButton>
											</Grid>
										</Grid>
									</Grid>
								)}
							</Toolbar>
						</AppBar>
					</ElevationScroll>
				</Grid>
			</Grid>
		</Grid>
	);
});

TopBarView.displayName = 'TopBarView';
TopBarView.defaultProps = {};

export default React.memo(TopBarView);
