import React from "react";
import { Text, Pressable } from "react-native";
import { cn } from "@/utils/cn";

interface CustomLinkProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

const CustomLink = ({
  children,
  onPress,
  className,
  textClassName,
  disabled = false,
}: CustomLinkProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn("py-1", disabled ? "opacity-50" : "opacity-100", className)}
    >
      <Text
        className={cn(
          "underline text-gray-60 text-xs font-montserrat-medium",
          disabled ? "text-gray-400" : "",
          textClassName
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomLink;
