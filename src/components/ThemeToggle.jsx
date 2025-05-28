import { Moon, Sun } from "lucide-react";
import { Button } from "@heroui/react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { updateToastConfig } from '../store/slices/toastSlice';

const ThemeToggle = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    console.log("darkMode", darkMode);
    dispatch(toggleTheme());
    dispatch(updateToastConfig({
      theme: darkMode ? "dark" : "light",
    }));
  };

  return (
    <Button
      onPress={handleThemeToggle}
      variant="flat"
      radius="lg"
      size="lg"
      aria-label="Toggle dark mode"
      isIconOnly={true}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;
