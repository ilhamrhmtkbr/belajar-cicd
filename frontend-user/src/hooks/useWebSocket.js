const useWebSocket = () => {
    let retryCount = 0;
    const maxRetries = 3;
    const reconnectInterval = 3000;

    const reconnect = (wsRef, username, setModalSuccessVerifyEmail) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.close();
        }

        const ws = new WebSocket(import.meta.env.VITE_APP_WEBSOCKET_USER_URL);
        wsRef.current = ws;

        ws.onopen = function () {
            retryCount = 0;
        }

        ws.onmessage = async function (event) {
            try {
                const message = JSON.parse(event.data);

                if (message.event === "pusher:connection_established") {
                    const data = JSON.parse(message.data);
                    const socketId = data.socket_id;

                    const channelName = "private-email-verify-" + username;

                    const authRes = await fetch(import.meta.env.VITE_APP_WEBSOCKET_USER_URL_AUTH, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Accept": "application/json",
                        },
                        credentials: "include",
                        body: new URLSearchParams({
                            socket_id: socketId,
                            channel_name: channelName,
                        }),
                    });

                    if (!authRes.ok) {
                        return;
                    }

                    const authDataRaw = await authRes.text();

                    let authDataJson;
                    try {
                        authDataJson = JSON.parse(authDataRaw);
                    } catch (parseError) {
                        return;
                    }

                    if (!authDataJson || !authDataJson.auth) {
                        return;
                    }

                    const subscribeMessage = {
                        event: "pusher:subscribe",
                        data: {
                            auth: authDataJson.auth, // Gunakan nilai dari kunci 'auth'
                            channel: channelName,
                        },
                    };

                    ws.send(JSON.stringify(subscribeMessage));
                }

                if (message.event === "verify.email") {
                    const payload = JSON.parse(message.data);
                    if (payload.username === username) {
                        setModalSuccessVerifyEmail(true);
                    }
                }

            } catch (e) {
                console.error("Error parsing message:", e);
            }
        };

        ws.onclose = function () {
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(reconnect, reconnectInterval);
            }
        };
    }

    return {reconnect}
}

export default useWebSocket