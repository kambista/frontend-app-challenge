import { cn } from "@/utils/cn";
import React from "react";
import { Pressable, Text } from "react-native";

interface TabProps {
  title: string;
  variant?: "active" | "inactive";
  onPress?: () => void;
}

const Tab: React.FC<TabProps> = ({ title, variant = "inactive", onPress }) => {
  const variantClasses = {
    active: "bg-primary-dark",
    inactive: "bg-white",
  };

  const textVariantClasses = {
    active: "text-white",
    inactive: "text-gray-40",
  };

  return (
    <Pressable
      className={cn(
        "flex-row flex-1 justify-center p-3 rounded-t-md",
        variantClasses[variant],
      )}
      onTouchEnd={onPress}
    >
      <Text
        className={cn(
          "text-sm font-montserrat-bold",
          textVariantClasses[variant],
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Tab;
