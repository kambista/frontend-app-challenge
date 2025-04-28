import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
} from "react-native";
import { cn } from "@/utils/cn";
import { ClassNameValue } from "tailwind-merge";
import FormField from "@/components/FormField";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: ClassNameValue | string;
}

const CustomInput = React.forwardRef<RNTextInput, CustomInputProps>(
  (
    {
      label,
      value,
      error,
      leftElement,
      rightElement,
      secureTextEntry = false,
      containerClassName,
      onChangeText,
      ...rest
    },
    ref
  ) => {
    return (
      <View className={cn("flex flex-col gap-2", containerClassName)}>
        <FormField label={label} error={error}>
          <View className="relative flex-row items-center">
            {leftElement && (
              <View className="absolute left-4">{leftElement}</View>
            )}
            <RNTextInput
              ref={ref}
              className={cn(
                "flex-1 border rounded-lg px-4 placeholder:text-gray-40 font-montserrat-medium h-11",
                error ? "border-red-500" : "border-gray-25",
                Platform.OS === "android" ? "py-2" : "leading-tight py-3 h-11"
              )}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              textAlignVertical="bottom"
              {...rest}
            />
            {rightElement && (
              <View className="absolute right-4">{rightElement}</View>
            )}
          </View>
        </FormField>
      </View>
    );
  }
);

export default CustomInput;
