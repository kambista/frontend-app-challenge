import React from "react";
import { View } from "react-native";
import { cn } from "../utils/cn";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  thickness?: number;
}

const Divider = ({
  orientation = "horizontal",
  className,
  thickness = 1,
}: DividerProps) => {
  return (
    <View
      className={cn(
        orientation === "horizontal"
          ? "w-full bg-gray-25"
          : "h-full bg-gray-25",
        className
      )}
      style={{
        height: orientation === "horizontal" ? thickness : undefined,
        width: orientation === "vertical" ? thickness : undefined,
      }}
    />
  );
};

export default Divider;
