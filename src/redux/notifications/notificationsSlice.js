import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [],
		alertNotifications: [],
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications.push(action.payload);
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		setAlertNotifications: (state, action) => {
			state.alertNotifications = action.payload;
		},
	},
});

export const { addNotification, setNotifications, setAlertNotifications } = notificationSlice.actions;

//selectors

export const selectNotificationsData = (state) => state.notifications.notifications;

export default notificationSlice.reducer;
