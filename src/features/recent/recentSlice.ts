import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RecentState = {
  recentShowIds: number[];
};

const initialState: RecentState = {
  recentShowIds: [],
};

const slice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    addRecent(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.recentShowIds = [id, ...state.recentShowIds.filter((i) => i !== id)].slice(0, 20);
    },
    clearRecent(state) {
      state.recentShowIds = [];
    },
  },
});

export const { addRecent, clearRecent } = slice.actions;

export default slice.reducer;
