import { useDispatch, useSelector } from 'react-redux';

import LiveTable from './LiveTable';
import { onLiveTableConnect, onLiveTableDisconnect } from '../services/reducers/live-table/actions';
import { WebSocketStatus } from '../utils/constants';
import cn from '../utils/classnames';

const App = () => {
  const dispatch = useDispatch();
  const { table, status } = useSelector(state => state.liveTable);

  const connect = () => dispatch(onLiveTableConnect('ws://localhost:3001'));
  const disconnect = () => dispatch(onLiveTableDisconnect());

  return (
    <div className="app">
      <h3 className="app__header">Live Table</h3>
      <p>
        Connection status:{' '}
        <span
          className={cn(
            'app__status',
            status === WebSocketStatus.Online ? 'app__status_is_online' : '',
            status === WebSocketStatus.Offline ? 'app__status_is_offline' : '',
            status === WebSocketStatus.Connecting ? 'app__status_is_connecting' : ''
          )}
        >
          {status}
        </span>
      </p>
      <div>
        <button
          onClick={() => connect()}
          disabled={status !== WebSocketStatus.Offline}
          className="app__button app__button_action_connect"
        >
          Connect
        </button>
        <button
          onClick={() => disconnect()}
          disabled={status !== WebSocketStatus.Online}
          className="app__button app__button_action_disconnect"
        >
          Disconnect
        </button>
      </div>
      {status === WebSocketStatus.Connecting ? 'Loading...' : <LiveTable table={table} />}
    </div>
  );
};

export default App;
