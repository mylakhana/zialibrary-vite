import { Select, SelectItem } from "@heroui/react";
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../store/slices/languageSlice';
import { updateToastConfig } from '../store/slices/toastSlice';

const LanguageToggle = () => {
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();

  const handleLanguageToggle = (selectedLanguage) => {
    const newLanguage = selectedLanguage.target.value === "en" ? "en" : "ar";
    dispatch(changeLanguage(newLanguage));
    dispatch(updateToastConfig({
      rtl: newLanguage === "ar",
      position: newLanguage === "ar" ? "bottom-left" : "bottom-right",
    }));
  };

  return (
    <Select
      selectedKeys={[currentLanguage]}
      onChange={handleLanguageToggle}
      className="w-[120px] mx-3"
      size="lg"
      aria-label="Select language"
      name="language"
    >
      <SelectItem key="en" value="en">
        English
      </SelectItem>
      <SelectItem key="ar" value="ar">
        العربية
      </SelectItem>
    </Select>
  );
};

export default LanguageToggle;
