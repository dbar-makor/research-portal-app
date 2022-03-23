import React from 'react';
import {
	Grid,
	Typography,
	IconButton,
	InputAdornment,
	CircularProgress,
	useMediaQuery,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as BlueBorder } from '../../../assets/icons/blueBorder.svg';
import TextInputUnit from '../../ui/reusables/TextInputUnit/TextInputUnit';
import { FilledButton } from '../../../styles/MainStyles';
import useStyles from './LoginPage.style';

const LoginPageView = (props) => {
	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.up('sm'));
	const loadingIndicator = useSelector((state) => state.auth.loadingIndicator);
	const classes = useStyles();

	return (
		<Grid container justifyContent="center" className={classes.modalContainer}>
			<Grid item xs={11} className={sm ? classes.desktopLoginContainer : classes.mobileLoginContainer}>
				<Grid container justifyContent="center">
					<Grid item xs={12} className={classes.paddingOfGrid}>
						<Grid container justifyContent="center">
							<BlueBorder />
							<Grid item xs={12}>
								<Grid container justifyContent="center">
									<Grid item className={classes.paddingTitle}>
										<Typography variant="h6" className={classes.portalTitle}>
											Research Portal
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} className={classes.marginTop5px}>
								<Grid container justifyContent="center">
									<Grid item>
										<Typography
											//   variant="subtitle3"
											className={classes.logTitle}
										>
											Please log into your account
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} className={classes.paddingBottom16px}>
								<TextInputUnit
									id="data-cy-login-username"
									className={classes.textFieldStyle}
									label="Username"
									name="username"
									value={props.form.username || ''}
									error={props.errors.username}
									inputProps={{
										style: {
											fontSize: 14,
										},
									}}
									onChange={props.handleChangeInputs}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={12} className={classes.paddingBottom8px}>
										<TextInputUnit
											id="data-cy-login-password"
											className={classes.textFieldStyle}
											label="Password"
											name="password"
											value={props.form.password || ''}
											error={props.errors.password}
											type={props.showPassword ? 'text' : 'password'}
											inputProps={{
												style: {
													fontSize: 14,
												},
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															className={classes.endAdornmentButton}
															aria-label="toggle password visibility"
															onClick={props.handleClickShowPassword}
															onMouseDown={props.handleMouseDownPassword}
														>
															{props.showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											onChange={props.handleChangeInputs}
											onKeyDown={(e) => {
												props.handlePressEnter(e);
											}}
										/>
									</Grid>
									<Grid container>
										<Grid item xs={12} className={classes.forgotStyle}>
											<Link to="/companies/contract" className={classes.linkStyle}>
												Forgot Password
											</Link>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justifyContent="center">
									<Grid item xs={12} className={classes.center}>
										<FilledButton
											id="loginBtn"
											varint="outlined"
											disabled={!props.validationResult || props.loadingIndicator}
											className={classes.logIn}
											onClick={props.handleLogin}
											//   disabled={form.username === "" || form.password === ""}
										>
											{loadingIndicator ? (
												<CircularProgress
													size={30}
													className={classes.circularProgress}
												/>
											) : (
												<Typography>Log in</Typography>
											)}
										</FilledButton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

LoginPageView.displayName = 'LoginPageView';
LoginPageView.defaultProps = {};

export default React.memo(LoginPageView);
