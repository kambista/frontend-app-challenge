import { cn } from "@/utils/cn";
import React from "react";
import { Pressable, Text } from "react-native";

interface TabProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const Tab = ({ title, isActive = false, onPress }: TabProps) => {
  return (
    <Pressable
      className={cn(
        "flex-row flex-1 justify-center p-3 rounded-t-md",
        isActive ? "bg-primary-dark" : "bg-white"
      )}
      onTouchEnd={onPress}
    >
      <Text
        className={cn(
          "text-sm font-montserrat-bold",
          isActive ? "text-white" : "text-gray-40"
        )}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Tab;
