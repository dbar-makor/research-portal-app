import React, { forwardRef } from 'react';
import { AppBar, Grid, Toolbar, Divider } from '@material-ui/core';
import TradingHours from '../TradingHours/TradingHours';
import MemberTopbar from '../topbarParts/MemberTopbar/MemberTopbar';
import SalesTopbar from '../topbarParts/SalesTopbar/SalesTopbar';
import AuthorTopbar from '../topbarParts/AuthorTopbar/AuthorTopbar';
import AdminTopbar from '../topbarParts/AdminTopbar/AdminTopbar';
import MakorLogo from '../topbarParts/MakorLogo/MakorLogo';
import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../../styles/MainStyles';
import useStyles from './TopBar.style';

const TopBarView = forwardRef((props, ref) => {
	const classes = useStyles();

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
					// handleClosePoppers={props.handleClosePoppers}
					// handleOpenPoppers={props.handleOpenPoppers}
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
			<Grid container item justifyContent="center" alignItems="center" className={classes.barWrapper}>
				<Grid item xs={9}>
					<AppBar position="sticky" className={classes.header}>
						<Toolbar style={{ minHeight: '8vh', height: '8vh', width: '100%' }}>
							<Grid item xs={3} style={{ marginLeft: '27px' }}>
								<MakorLogo classes={classes} userType={props.userType} />
							</Grid>
							<Grid item container xs={4} justifyContent="flex-end">
								{0 && (
									<StyledTextField
										id="searchField"
										className={classes.search}
										value={props.searchTerm}
										variant="filled"
										fullWidth
										placeholder="Search"
										InputProps={{
											endAdornment: (
												<SearchIcon
													className={classes.searchIcon}
													style={{ cursor: 'pointer', stroke: 'none' }}
												/>
											),
										}}
										// onKeyDown={(e) =>
										// 	e.key === 'Enter'
										// 		? dispatch(setProperty({ key: 'search', value: props.searchTerm }))
										// 		: null
										// }
										onChange={(e) => props.setSearchTerm(e.target.value)}
									/>
								)}
							</Grid>
							{props.isAuthenticated && (
								<Grid item xs={5}>
									{handleBarOptions(props.userType)}
								</Grid>
							)}
						</Toolbar>
					</AppBar>
				</Grid>
			</Grid>
		</Grid>
	);
});

TopBarView.displayName = 'TopBarView';
TopBarView.defaultProps = {};

export default React.memo(TopBarView);
