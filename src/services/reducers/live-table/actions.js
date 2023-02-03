import { createAction } from '@reduxjs/toolkit';

export const onLiveTableConnect = createAction('LIVE_TABLE_CONNECT');
export const onLiveTableDisconnect = createAction('LIVE_TABLE_DISCONNECT');
export const onLiveTableConnecting = createAction('LIVE_TABLE_CONNECTING');
export const onLiveTableOpen = createAction('LIVE_TABLE_OPEN');
export const onLiveTableClose = createAction('LIVE_TABLE_CLOSE');
export const onLiveTableMessage = createAction('LIVE_TABLE_MESSAGE');
export const onLiveTableError = createAction('LIVE_TABLE_ERROR');
