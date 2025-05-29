import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
  isLoading: false,
  error: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setGenres, setLoading, setError } = genreSlice.actions;
export default genreSlice.reducer; 