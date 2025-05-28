import { createSlice } from '@reduxjs/toolkit';

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");
const initialState = {
  darkMode: storedTheme ? storedTheme === "dark" : systemPrefersDark
};

// Apply initial theme
if (initialState.darkMode) {
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      
      // Update document and localStorage
      if (state.darkMode) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem("theme", "light");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer; 