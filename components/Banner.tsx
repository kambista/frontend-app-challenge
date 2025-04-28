import React from "react";
import { View, Text } from "react-native";
import { cn } from "../utils/cn";
import WarningIcon from "./Icons/WarningIcon";
import InfoIcon from "./Icons/InfoIcon";
import { ClassNameValue } from "tailwind-merge";

interface BannerProps {
  children: React.ReactNode;
  variant?: "info" | "warning";
  icon?: React.ReactNode;
  className?: ClassNameValue | string;
  textClassName?: ClassNameValue;
}

const Banner = ({
  children,
  variant = "info",
  icon,
  className,
  textClassName,
}: BannerProps) => {
  const variants = {
    info: {
      backgroundColor: "bg-informative-blue-light",
      textColor: "text-informative-blue-dark",
      icon: <InfoIcon size={20} color="#082774" />,
    },
    warning: {
      backgroundColor: "bg-warning-light",
      textColor: "text-warning-dark",
      icon: <WarningIcon size={20} color="#7B3F0A" />,
    },
  };

  const currentVariant = variants[variant];

  const containerClasses = cn(
    "flex-row items-center p-3 rounded-lg",
    currentVariant.backgroundColor,
    className
  );

  const textClasses = cn(
    "flex-1 text-xs font-montserrat-medium",
    currentVariant.textColor,
    textClassName
  );

  const iconToShow = icon || currentVariant.icon;

  return (
    <View className={containerClasses}>
      <View className="mr-3">{iconToShow}</View>
      <Text className={textClasses}>{children}</Text>
    </View>
  );
};

export default Banner;
