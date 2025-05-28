import { Moon, Sun } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { updateToastConfig } from '../store/slices/toastSlice';

export default function ThemeSwitch({ sidebarCollapsed }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    const newTheme = darkMode ? "light" : "dark";
    dispatch(toggleTheme());
    dispatch(updateToastConfig({
      theme: newTheme,
    }));
  };

  return (
    <div
      onClick={handleThemeToggle}
      className={`relative w-16 h-9 rounded-full cursor-pointer transition-colors duration-300 ${
        darkMode ? "bg-[#3F3F46]" : "bg-[#F4F4F5]"
      }`}
    >
      {/* Thumb */}
      <div
        className={`absolute top-1 left-1 rounded-full transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] ${
          sidebarCollapsed ? "w-0 h-0 opacity-0" : "w-7 h-7 opacity-100"
        } ${
          darkMode ? "translate-x-7 bg-[#444]" : "translate-x-0 bg-gray-200"
        }`}
        style={{ zIndex: 5 }}
      />

      {/* Sun Icon (Left Centered) */}
      <Sun
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 transition-opacity duration-300 ${
          darkMode ? "text-gray-500 opacity-50" : "text-black opacity-100"
        }`}
      />

      {/* Moon Icon (Right Centered) */}
      <Moon
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 transition-opacity duration-300 ${
          darkMode ? "text-white opacity-100" : "text-gray-500 opacity-50"
        }`}
      />
    </div>
  );
}
