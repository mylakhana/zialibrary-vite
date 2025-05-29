import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: {
    data: [],
    loading: false,
    error: null,
  },
  artists: {
    data: [],
    loading: false,
    error: null,
  },
  // Future items can be added here with the same structure
  // example:
  // tracks: {
  //   data: [],
  //   loading: false,
  //   error: null,
  // },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Genre actions
    setGenres: (state, action) => {
      state.genres.data = action.payload;
      state.genres.loading = false;
      state.genres.error = null;
    },
    setGenresLoading: (state, action) => {
      state.genres.loading = action.payload;
    },
    setGenresError: (state, action) => {
      state.genres.error = action.payload;
      state.genres.loading = false;
    },

    // Artist actions
    setArtists: (state, action) => {
      state.artists.data = action.payload;
      state.artists.loading = false;
      state.artists.error = null;
    },
    setArtistsLoading: (state, action) => {
      state.artists.loading = action.payload;
    },
    setArtistsError: (state, action) => {
      state.artists.error = action.payload;
      state.artists.loading = false;
    },

    // Future items can be added here with the same pattern
  },
});

export const {
  // Genre actions
  setGenres,
  setGenresLoading,
  setGenresError,
  // Artist actions
  setArtists,
  setArtistsLoading,
  setArtistsError,
} = dataSlice.actions;

export default dataSlice.reducer; 