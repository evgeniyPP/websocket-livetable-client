export function socketMiddleware({
  onConnect,
  onDisconnect,
  onConnecting,
  onOpen,
  onClose,
  onError,
  onMessage,
}) {
  return ({ dispatch }) => {
    let socket = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      if (action.type === onDisconnect.type) {
        isConnected = false;
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;

        socket.close(1000, 'User disconnected');
      }

      if (action.type !== onConnect.type) {
        next(action);
        return;
      }

      url = action.payload;
      socket = new WebSocket(url);
      isConnected = true;
      dispatch(onConnecting());

      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onerror = event => {
        console.error('socket.onerror', event);
      };

      socket.onclose = event => {
        if (event.code !== 1000) {
          console.error('socket.onclose', event);
          dispatch(onError(event.code.toString()));
        }

        dispatch(onClose(event.code.toString()));

        if (isConnected) {
          dispatch(onConnecting());
          reconnectTimer = window.setTimeout(() => {
            dispatch(onConnect(url));
          }, 3000);
        }
      };

      socket.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        dispatch(onMessage(parsedData));
      };

      next(action);
    };
  };
}
