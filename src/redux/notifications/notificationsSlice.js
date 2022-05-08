import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [],
		alertNotifications: [],
		newNotification: false,
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications.push(action.payload);
		},
		addAlertNotification: (state, action) => {
			state.alertNotifications.push(action.payload);
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		setAlertNotifications: (state, action) => {
			state.alertNotifications = action.payload;
		},
		setNewNotification: (state, action) => {
			state.newNotification = action.payload;
		},
	},
});

export const {
	addNotification,
	setNotifications,
	setAlertNotifications,
	addAlertNotification,
	setNewNotification,
} = notificationSlice.actions;

//selectors

export const selectNotificationsData = (state) => state.notifications.notifications;

export default notificationSlice.reducer;
