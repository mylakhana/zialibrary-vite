import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  volume: 0.5,
  playbackSpeed: 1,
  currentTime: 0,
  duration: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter((track) => track.id !== action.payload);
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setPlaybackSpeed: (state, action) => {
      state.playbackSpeed = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  togglePlay,
  setQueue,
  addToQueue,
  removeFromQueue,
  setVolume,
  setPlaybackSpeed,
  setCurrentTime,
  setDuration,
} = playerSlice.actions;

export default playerSlice.reducer; 