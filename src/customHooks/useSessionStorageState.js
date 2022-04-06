import { useState, useEffect } from 'react';

function getSessionStorageOrDefault(key, defaultValue) {
	const savedData = sessionStorage.getItem(key);

	if (!savedData) {
		return defaultValue;
	}

	return JSON.parse(savedData);
}

// The function expects the name of the key to be stored in sessionStorage, and a default value for a state variable. It returns a the state variable and its setter.

const useSessionStorageState = (key, defaultValue) => {
	const [value, setValue] = useState(getSessionStorageOrDefault(key, defaultValue));

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));

		// Clearing sessionStorage when exiting the component
		return () => {
			sessionStorage.removeItem(key);
		};
	}, [value]);

	return [value, setValue];
};

export default useSessionStorageState;
