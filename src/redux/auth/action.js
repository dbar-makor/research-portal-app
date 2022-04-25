import axios from 'axios';
//import { useLocation, useHistory } from 'react-router-dom';
// Actions
import * as actionSnackBar from '../SnackBar/action';
// Constants
import { END_POINT, BASE_URL } from '../../utils/constants';
import { changeChosenCompany } from '../companies/chosenCompanySlice';
import { SET_LOADING_INDICATOR_AUTH, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';

export const login = (email, password) => async (dispatch) => {
	dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: true });

	try {
		const headers = { 'Content-Type': 'application/json' };

		const res = await axios({
			method: 'PUT',
			url: `${BASE_URL}${END_POINT.AUTH}`,
			data: { username: email, password: password },
			headers: headers,
		});

		if (res.status === 200) {
			localStorage.setItem('token', `Bearer ${res.data.token}`);

			const userContent = { ...res.data.user, ...res.data.payload.user };

			localStorage.setItem('userContent', JSON.stringify(userContent));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token: res.data.token, userContent: userContent },
			});

			dispatch(actionSnackBar.setSnackBar('success', 'Successfully connected', 2000));
		} else {
			dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
		}
	} catch (error) {
		/* eslint no-console: "off" */
		console.log(error);

		if (error) {
			dispatch(actionSnackBar.setSnackBar('error', 'You dont have access to the platform', 3000));
		} else {
			if (error.response && error.response.data !== undefined) {
				dispatch(actionSnackBar.setSnackBar('error', 'Login failed', 2000));
			} else {
				dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
			}
		}

		dispatch({ type: SET_LOADING_INDICATOR_AUTH, payload: false });
	}
};

export const logout = () => async (dispatch) => {
	try {
		const token = localStorage.getItem('token');

		const res = await axios.delete(`${BASE_URL}${END_POINT.AUTH}`, {
			headers: { Authorization: token },
		});

		if (res.status === 200) {
			localStorage.clear();
			dispatch({ type: LOGOUT_SUCCESS });
			dispatch(changeChosenCompany(null));
			dispatch(actionSnackBar.setSnackBar('success', 'Successfully disconnected', 2000));
		}
	} catch (error) {
		dispatch(actionSnackBar.setSnackBar('error', 'Logout failed', 3000));
	}
};
