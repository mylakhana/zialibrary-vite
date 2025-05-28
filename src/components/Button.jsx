import { Button as HeroButton } from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function Button({
  children,
  isLoading,
  disabled,
  onClick,
  type = "button",
  icon,
  iconPosition = "left", // 'left' or 'right'
  className = "",
  ...props
}) {
  const { t } = useTranslation();

  return (
    <HeroButton
      radius="full"
      size="lg"
      variant={disabled ? "flat" : "shadow"}
      color="primary"
      className={`disabled:bg-gray-300 text-white cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      type={type}
      isLoading={isLoading}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </HeroButton>
  );
}
