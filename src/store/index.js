import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import preferencesReducer from "./slices/preferencesSlice";
import profileReducer from "./slices/profileSlice";
import themeReducer from "./slices/themeSlice";
import toastReducer from "./slices/toastSlice";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    language: languageReducer,
    theme: themeReducer,
    toast: toastReducer,
    preferences: preferencesReducer,
    player: playerReducer,
  },
});
