import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState: {
		searchTerm: 'lalala',
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { setSearchTerm } = searchSlice.actions;

//selectors

export const selectSearchTerm = (state) => state.searchSlice.searchTerm;

export default searchSlice.reducer;
