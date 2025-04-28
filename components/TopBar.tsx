import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/utils/cn";

interface TopBarProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  className?: string;
  titleClassName?: string;
  showShadow?: boolean;
  scrollOffset?: Animated.SharedValue<number>;
}

const TopBar = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  className,
  titleClassName
}: TopBarProps) => {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between z-10 p-4 fixed",
        Platform.OS === "ios" ? "top-0" : "mt-10",
        className
      )}
    >
      <View className="w-10">
        {leftIcon && (
          <Pressable
            onPress={onLeftPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="p-1"
          >
            {leftIcon}
          </Pressable>
        )}
      </View>

      <View className="items-center flex-1">
        <Text
          className={cn(
            "text-primary-dark font-montserrat-bold text-sm",
            titleClassName
          )}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View className="items-end w-10">
        {rightIcon && (
          <Pressable
            onPress={onRightPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="p-1"
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default TopBar;
