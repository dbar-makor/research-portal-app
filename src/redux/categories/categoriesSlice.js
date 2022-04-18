import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
	},
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export const getCategoriesAsync = () => async (dispatch) => {
	try {
		console.log('herer');
		const res = await axios.get(`${BASE_URL}${END_POINT.ALLCATEGORIES}`);

		if (res.status === 200) {
			dispatch(setCategories(res.data));
		}
	} catch (error) {
		/* eslint no-console: "off" */
		console.log(error, error.message);
	}
};

export default categoriesSlice.reducer;
