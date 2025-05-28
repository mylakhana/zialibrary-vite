import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  rtl: false,
  theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    updateToastConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateToastConfig } = toastSlice.actions;
export default toastSlice.reducer; 