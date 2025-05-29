import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/menu_icons/avatar.png";
import { changeLanguage } from "../store/slices/languageSlice";
import { updateToastConfig } from "../store/slices/toastSlice";

function ProfileTile({
  isCollapsed = false,
  isOnline = true,
  name = "Ahmed Jamal",
  email = "emon.vida@gmail.com",
}) {
  const { t } = useTranslation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    var newLanguage = currentLanguage == "ar" ? "en" : "ar";
    dispatch(changeLanguage(newLanguage));
    dispatch(
      updateToastConfig({
        rtl: newLanguage == "ar",
        position: newLanguage == "ar" ? "bottom-left" : "bottom-right",
      })
    );
  };

  const avatarWidget = (
    <div className={`flex-shrink-0 w-12 h-12`}>
      <img src={avatar} alt="Profile" className="w-full h-full" />
      {/* Online Status Dot */}
      {/* <div
        className={`absolute top-0 right-0 w-3 h-3 ${
          isOnline ? "bg-green-500" : "bg-gray-500"
        } rounded-full border-2 border-white dark:border-gray-700`}
      ></div> */}
    </div>
  );

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger className="cursor-pointer">
        {isCollapsed ? (
          <div className="flex justify-center">{avatarWidget}</div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-lg h-[80px] bg-[#F4F4F5] dark:bg-[#3F3F46] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {avatarWidget}
            <div className="w-[55%]">
              <p className="font-semibold text-[15px] truncate">{name}</p>
              <p className="text-xs text-gray-500 dark:text-[#71717A] truncate">
                {email}
              </p>
            </div>
            <EllipsisVertical className="h-5" />
          </div>
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="faded">
        <DropdownItem key="new" onPress={handleLanguageToggle}>
          {currentLanguage == "ar" ? "English" : "العربية"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileTile;
