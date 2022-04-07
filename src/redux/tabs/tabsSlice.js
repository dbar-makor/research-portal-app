import { createSlice } from '@reduxjs/toolkit';

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState: {
		settingsTab: 0,
	},
	reducers: {
		changeSettingsTab: (state, action) => {
			state.settingsTab = action.payload;
		},
	},
});

export const { changeSettingsTab } = tabsSlice.actions;

//selectors

export const selectSettingsTabData = (state) => state.tabs.settingsTab;

export default tabsSlice.reducer;
