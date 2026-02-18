import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Show from '../../domain/entities/Show';

type WatchlistState = {
  ids: number[];
  entities: Record<number, Show>;
};

const initialState: WatchlistState = {
  ids: [],
  entities: {},
};

const slice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist(state, action: PayloadAction<Show[]>) {
      const arr = action.payload;
      state.ids = arr.map((s) => s.id);
      state.entities = arr.reduce((acc, s) => {
        acc[s.id] = s;
        return acc;
      }, {} as Record<number, Show>);
    },
    toggleWatchlistLocal(state, action: PayloadAction<Show>) {
      const show = action.payload;
      if (state.ids.includes(show.id)) {
        state.ids = state.ids.filter((id) => id !== show.id);
        delete state.entities[show.id];
      } else {
        state.ids.unshift(show.id);
        state.entities[show.id] = show;
      }
    },
  },
});

export const { setWatchlist, toggleWatchlistLocal } = slice.actions;

export default slice.reducer;
