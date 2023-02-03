import { configureStore } from '@reduxjs/toolkit';
import { liveTableMiddleware, liveTableReducer } from './reducers/live-table/reducer';

export const store = configureStore({
  reducer: {
    liveTable: liveTableReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(liveTableMiddleware),
});
