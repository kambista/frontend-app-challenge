import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/utils/cn";

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const FormField = ({
  children,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  helpText,
}: FormFieldProps) => {
  return (
    <View className={cn("flex-col gap-2", className)}>
      {label && (
        <Text
          className={cn(
            "text-gray-60 text-sm font-montserrat-medium",
            labelClassName
          )}
        >
          {label}
        </Text>
      )}

      {children}

      {error ? (
        <Text
          className={cn(
            "text-red-500 text-xs font-montserrat-regular",
            errorClassName
          )}
        >
          {error}
        </Text>
      ) : helpText ? (
        <Text className="text-xs text-gray-40 font-montserrat-regular">
          {helpText}
        </Text>
      ) : null}
    </View>
  );
};

export default FormField;
