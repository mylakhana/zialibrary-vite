import { Accordion, AccordionItem, Button, Tooltip } from "@heroui/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProfileTile from "./ProfileTile";
import SvgHandler from "./SvgHandler";
import ThemeSwitch from "./ThemeSwitch";

function Sidebar() {
  const { t } = useTranslation();
  //get from local storage
  const darkMode = localStorage.getItem("theme") === "dark";

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const name = useSelector((state) => state.profile.name);
  const email = useSelector((state) => state.profile.email);
  var collapsedWidth = "80px";
  var expandedWidth = "280px";

  const [sidebarWidth, setSidebarWidth] = useState(
    isCollapsed ? collapsedWidth : expandedWidth
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
    setSidebarWidth(isCollapsed ? collapsedWidth : expandedWidth);
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      to: "/home",
      svgIcon: "HomeIcon",
      label: t("sidebar.home"),
    },
    {
      to: "/settings",
      svgIcon: "MoreCircleIcon",
      label: t("sidebar.settings"),
    },
    {
      to: "/template",
      svgIcon: "MoreCircleIcon",
      label: t("sidebar.template"),
    },
  ];

  return (
    <div
      className={`bg-[#E4E4E7] dark:bg-[#27272A] transition-all duration-300 ease-in-out h-screen flex flex-col`}
      style={{ width: sidebarWidth }}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div
          className={`flex flex-col ${isCollapsed ? "items-center" : ""} p-4`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center mb-6 mt-4 gap-4">
            <img
              src={darkMode ? "/logo_wh.png" : "/logo_bk.png"}
              alt="Zia Library Logo"
              className="h-12 w-12"
            />
            {!isCollapsed && (
              <p className="text-[18px] font-bold">Zia Library</p>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[#71717A] dark:text-[#D4D4D8] text-[14px]`}
              >
                {isCollapsed ? (
                  <span className="w-10 h-10">&nbsp;</span>
                ) : (
                  t("sidebar.mainMenu")
                )}
              </span>
            </div>

            <nav className="w-full">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  if (item.type === "divider") {
                    return (
                      <div
                        key="divider"
                        className={`w-full h-[1px] ${
                          isCollapsed
                            ? "bg-transparent"
                            : "bg-gray-200 dark:bg-gray-800"
                        } my-4`}
                      ></div>
                    );
                  }
                  return (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      svgIcon={item.svgIcon}
                      label={item.label}
                      isCollapsed={isCollapsed}
                      suffix={item.suffix}
                      onClick={item.onClick}
                    >
                      {item.subItems?.map((subItem) => (
                        <SubNavItem
                          key={subItem.to}
                          to={subItem.to}
                          label={subItem.label}
                          isCollapsed={isCollapsed}
                        />
                      ))}
                    </NavItem>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <ProfileTile isCollapsed={isCollapsed} name={name} email={email} />

        <div
          className={`flex ${
            isCollapsed ? "flex-col" : "flex-row"
          } items-center justify-between ${
            isCollapsed ? "flex-col-reverse" : ""
          } mt-4`}
        >
          <ThemeSwitch />
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            size="sm"
            onPress={toggleSidebar}
            className={`${isCollapsed ? "mb-12 mt-2" : ""}`}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      </div>
    </div>
  );
}

const SuffixBadge = ({
  bgColor = "bg-gray-200 dark:bg-gray-600",
  textColor = "text-gray-800 dark:text-gray-200",
  content = "",
}) => {
  return (
    <span
      className={`px-2 py-1 ${bgColor} ${textColor} rounded-full text-sm font-light`}
    >
      {content}
    </span>
  );
};

const tooltip = (content, label, to) => {
  return (
    <Tooltip
      key={to}
      color="default"
      content={label}
      placement="right"
      offset={15}
      radius="sm"
    >
      <div>{content}</div>
    </Tooltip>
  );
};

const NavItem = ({
  to,
  svgIcon,
  label,
  isCollapsed,
  children,
  suffix,
  onClick,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const location = useLocation();
  const isActive =
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  // Update selectedKeys when location changes
  useEffect(() => {
    if (children && isActive) {
      setSelectedKeys(new Set([to]));
    }
  }, [location.pathname, to, children, isActive]);

  const svg = (
    <SvgHandler
      name={svgIcon}
      className={`w-6 h-6 ${isActive ? "text-orange-700" : ""}`}
    />
  );

  const itemClasses = `flex items-center gap-3 px-2 py-3 my-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
    isActive ? "bg-gray-100 dark:bg-gray-700 text-orange-700" : ""
  }`;

  const content = isCollapsed ? (
    tooltip(svg, label, to)
  ) : (
    <>
      {svg}
      <div className="flex items-center justify-between flex-1">
        <span>{label}</span>
        {suffix}
      </div>
    </>
  );

  if (onClick) {
    return (
      <li>
        <button
          onClick={onClick}
          className={`${itemClasses} cursor-pointer w-full`}
        >
          {content}
        </button>
      </li>
    );
  }

  if (!children) {
    return (
      <li>
        <Link to={to} className={itemClasses}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Accordion
        className="px-0"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        hideIndicator
        itemClasses={{
          base: "border-none",
          title: "font-normal",
          trigger: "px-0 py-0 hover:bg-transparent",
          content: "px-0 py-0",
        }}
      >
        <AccordionItem
          key={to}
          aria-label={label}
          title={
            <div className={itemClasses}>
              {isCollapsed ? tooltip(svg, label) : svg}
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>{label}</span>
                  <div className="flex items-center gap-2">
                    {suffix}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        selectedKeys.has(to) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          }
        >
          <ul className="ml-6 mt-2 space-y-2">{children}</ul>
        </AccordionItem>
      </Accordion>
    </li>
  );
};

const SubNavItem = ({ to, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 p-2 ${
          isActive ? "bg-gray-100 dark:bg-gray-800 text-primary" : ""
        }`}
      >
        {isCollapsed ? (
          tooltip(<SvgHandler />, label, to)
        ) : (
          <span>{label}</span>
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
