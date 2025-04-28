import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
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
  onChange
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handlePress = () => {
    if (disabled) return;

    const newValue = !isChecked;
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
      <View>
        <View className="relative items-center justify-center">
          {!isChecked && (
            <View className="items-center justify-center w-4 h-4">
              <UnCheckedIcon size={20} color={uncheckedColor} />
            </View>
          )}
          {isChecked && (
            <View className="items-center justify-center">
              <CheckedIcon size={14} color={checkedColor} />
            </View>
          )}
        </View>
      </View>
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
