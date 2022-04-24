import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';

// Reducer
export const chosenResearchSlice = createSlice({
	name: 'chosenResearch',
	initialState: null,
	reducers: {
		changeChosenResearch: (state, action) => {
			return (state = action.payload);
		},
	},
});

// Selectors
export const selectChosenResearch = (state) => state.chosenResearch;

export const { changeChosenResearch } = chosenResearchSlice.actions;

export const getChosenResearchAsync = (id) => async (dispatch) => {
	if (id === '') {
		return dispatch(changeChosenResearch(null));
	}

	try {
		const token = localStorage.getItem('token');

		const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/${id}`, {
			headers: { Authorization: token },
		});

		if (res.status === 200 || res.status === 201) {
			dispatch(changeChosenResearch(res.data));
		}
	} catch (error) {
		/* eslint no-console: "off" */
		console.log(error, error.message);
	}
};

export default chosenResearchSlice.reducer;
