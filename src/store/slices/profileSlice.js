import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "John Doe",
  email: "Guest Mode",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
