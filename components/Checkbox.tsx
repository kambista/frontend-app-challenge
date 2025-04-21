import React, { useState, useEffect } from "react";
import { TouchableOpacity, Animated, View, Text } from "react-native";
import CheckedIcon from "./Icons/CheckedIcon";
import UnCheckedIcon from "./Icons/UnCheckedIcon";
import { cn } from "../utils/cn";

interface CustomCheckboxProps {
  checked?: boolean;
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
  className?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  size = 20,
  checkedColor = "#060F26",
  uncheckedColor = "#A7A7A7",
  className,
  disabled = false,
  label,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(isChecked ? 1 : 0);

  useEffect(() => {
    setIsChecked(checked);
    Animated.timing(opacityAnim, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  const handlePress = () => {
    if (disabled) return;

    const newValue = !isChecked;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(opacityAnim, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const containerClasses = cn(
    "flex flex-row justify-center items-center",
    disabled ? "opacity-50" : "",
    className
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      className={containerClasses}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View className="relative items-center justify-center">
          <Animated.View
            style={{
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              position: "absolute",
            }}
            className="items-center justify-center"
          >
            <UnCheckedIcon size={20} color={uncheckedColor} />
          </Animated.View>

          <Animated.View
            style={{
              opacity: opacityAnim,
            }}
            className="items-center justify-center"
          >
            <CheckedIcon size={16} color={checkedColor} />
          </Animated.View>
        </View>
      </Animated.View>
      {label && typeof label === "string" && (
        <View className="ml-1">
          <Text className="text-xs text-gray-60 font-montserrat-medium">
            {label}
          </Text>
        </View>
      )}
      {label && typeof label !== "string" && (
        <View className="ml-1">{label}</View>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
