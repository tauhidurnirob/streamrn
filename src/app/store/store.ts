import { configureStore } from '@reduxjs/toolkit';
import tvmazeApi from '../../data/api/tvmazeApiSlice';
import watchlistReducer from '../../features/watchlist/watchlistSlice';
import playbackReducer from '../../features/player/playbackSlice';
import recentReducer from '../../features/recent/recentSlice';

export const store = configureStore({
  reducer: {
    [tvmazeApi.reducerPath]: tvmazeApi.reducer,
    watchlist: watchlistReducer,
    playback: playbackReducer,
    recent: recentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tvmazeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
