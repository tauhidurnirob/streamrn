import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducers — will add real slices later
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
