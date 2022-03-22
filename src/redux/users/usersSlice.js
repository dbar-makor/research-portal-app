import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import { setParams } from '../../utils/helpers/helperFunctions';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		loading: false,
		offset: 0,
		limit: 15,
		search: '',
		status: '',
		hasMore: false,
		usersData: [],
		sales: [],
		author: [],
		metaData: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setUsersByType: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		getUsersData: (state, action) => {
			state.usersData = action.payload;
			state.loading = false;
		},
		setUserProperty: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setUserHasMore: (state, action) => {
			state.hasMore = action.payload;
		},
	},
});

//selectors

export const selectUsersData = (state) => state.users.usersData;
export const selectSalesUsersData = (state) => state.users.sales;
export const selectAuthorsUsersData = (state) => state.users.author;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersSearch = (state) => state.users.search;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersOffset = (state) => state.users.offset;
export const selectUsersLimit = (state) => state.users.limit;
export const selectUsersMetaData = (state) => state.users.metaData;
export const selectUsersHasMore = (state) => state.users.hasMore;
export const {
	getUsersData,
	setLoading,
	deleteUser,
	setUsersByType,
	setUserProperty,
	setMetaData,
	setUserHasMore,
} = usersSlice.actions;
//action thunk

export const getUsersByTypeAsync = (offset, limit, search, type, status) => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const state = getState();
	try {
		const res = await axios.get(
			`${BASE_URL}${END_POINT.USER}`,
			setParams(offset, limit, search, type, status),
		);
		if (res.status === 200) {
			dispatch(setUserProperty({ key: 'metaData', value: res.data.meta_data }));
			dispatch(setLoading(false));
			if (res.data.meta_data.sum_rows > state.users[type].length) {
				dispatch(setUserProperty({ key: 'hasMore', value: true }));
			} else {
				dispatch(setUserProperty({ key: 'hasMore', value: false }));
			}

			if (offset === 0) {
				dispatch(setUsersByType({ key: type, value: res.data.users }));
			} else if (offset !== 0 && res.data.meta_data.sum_rows > state.users[type].length) {
				const dataCopy = [...state.users[type]];
				dataCopy.push(...res.data.users);
				dispatch(setUsersByType({ key: type, value: dataCopy }));
			}
		}
	} catch (error) {
		dispatch(setLoading(false));
	}
};

export const getUsersDataAsync = () => async (dispatch) => {
	dispatch(setLoading(true));

	try {
		const res = await axios.get(BASE_URL + END_POINT.USER);
		if (res.status === 200) {
			dispatch(getUsersData(res.data.user));
		}
	} catch (error) {
		dispatch(setLoading(false));
	}
};

export default usersSlice.reducer;
