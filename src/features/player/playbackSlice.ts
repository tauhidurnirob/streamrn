import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PlaybackState = {
  progressByEpisodeId: Record<number, number>;
};

const initialState: PlaybackState = {
  progressByEpisodeId: {},
};

const slice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<{ episodeId: number; position: number }>) {
      const { episodeId, position } = action.payload;
      state.progressByEpisodeId[episodeId] = position;
    },
    clearProgress(state, action: PayloadAction<number>) {
      delete state.progressByEpisodeId[action.payload];
    },
  },
});

export const { setProgress, clearProgress } = slice.actions;

export default slice.reducer;
