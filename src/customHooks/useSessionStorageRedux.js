import { useEffect } from 'react';

// The function expects the name of the key to be stored in sessionStorage and the redux value associated with the key
const useSessionStorageRedux = (key, value) => {
	useEffect(() => {
		const savedData = sessionStorage.getItem(key);

		if (!savedData) {
			sessionStorage.setItem(key, JSON.stringify(value));
		}

		// Clearing sessionStorage when exiting the component
		return () => {
			sessionStorage.removeItem(key);
		};
	}, []);
};

export default useSessionStorageRedux;
