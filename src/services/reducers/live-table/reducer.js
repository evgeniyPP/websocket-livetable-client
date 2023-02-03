import { createReducer } from '@reduxjs/toolkit';

import { WebSocketStatus } from '../../../utils/constants';
import { socketMiddleware } from '../../middlewares/socket-middleware';
import {
  onLiveTableClose,
  onLiveTableConnect,
  onLiveTableConnecting,
  onLiveTableDisconnect,
  onLiveTableError,
  onLiveTableMessage,
  onLiveTableOpen,
} from './actions';
import { updateLiveTable } from './update-live-table';

const initialState = {
  status: WebSocketStatus.Offline,
  connectionError: '',
  table: [],
};

export const liveTableMiddleware = socketMiddleware({
  onConnect: onLiveTableConnect,
  onDisconnect: onLiveTableDisconnect,
  onConnecting: onLiveTableConnecting,
  onOpen: onLiveTableOpen,
  onClose: onLiveTableClose,
  onError: onLiveTableError,
  onMessage: onLiveTableMessage,
});

export const liveTableReducer = createReducer(initialState, builder => {
  builder
    .addCase(onLiveTableConnecting, state => {
      state.status = WebSocketStatus.Connecting;
    })
    .addCase(onLiveTableOpen, state => {
      state.status = WebSocketStatus.Online;
      state.connectionError = '';
    })
    .addCase(onLiveTableClose, state => {
      state.status = WebSocketStatus.Offline;
      state.connectionError = '';
    })
    .addCase(onLiveTableError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(onLiveTableMessage, (state, action) => {
      state.table = updateLiveTable(state.table, action.payload);
    });
});
