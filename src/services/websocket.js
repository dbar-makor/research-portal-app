// eslint-disable-next-line
export let ws = null;

let messages = [];

export const connectWS = (token) => {
	if ((ws === null || ws.readyState === 3) && token) {
		ws = new WebSocket(`${process.env.REACT_APP_WS_URL}?token=${token}`);
		messages = [];
	}
};

export const sendEvent = (data, token) => {
	messages.push(data);

	if (ws !== null) {
		if (ws.readyState !== 1) {
			messages.push(data);
		} else {
			ws.send(JSON.stringify(data));
		}

		ws.onopen = () => {
			messages.forEach((message) => {
				ws.send(JSON.stringify(message));
			});
		};

		ws.onmessage = (event) => {
			if (event.data.size !== 0) {
				const response = JSON.parse(event.data);

				postMessage(response);
			}
		};

		ws.onclose = (event) => {
			if (!event.wasClean) {
				// e.g. server process killed or network down
				// event.code is usually 1006 in this case
				ws = null;

				setTimeout(function () {
					connectWS(token);
				}, 1000);
			}
		};
		ws.onerror = () => {
			if (ws.code !== 4000) {
				setTimeout(function () {
					connectWS(token);
				}, 2000);
			}
		};
	} else {
		connectWS(token);
	}
};

export const closeWS = () => {
	if (ws) {
		if (ws.readyState === 1) {
			ws.send(JSON.stringify({ type: 'close-connection' }));
			ws.close();
			ws = null;
		}
	}
};
