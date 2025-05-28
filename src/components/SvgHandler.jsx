import BellIcon from "../assets/menu_icons/bell.svg?react";
import BoxIcon from "../assets/menu_icons/box.svg?react";
import HomeIcon from "../assets/menu_icons/home_smile.svg?react";
import MoreCircleIcon from "../assets/menu_icons/more_circle.svg?react";

const svgComponents = {
  HomeIcon,
  BoxIcon,
  BellIcon,
  MoreCircleIcon,
};

const SvgHandler = ({ name = "HomeIcon", className = "" }) => {
  const SvgComponent = svgComponents[name];

  if (!SvgComponent) {
    console.warn(`SVG component "${name}" not found. Using default HomeIcon.`);
    return <HomeIcon className={className} />;
  }

  return <SvgComponent className={className} />;
};

export default SvgHandler;
