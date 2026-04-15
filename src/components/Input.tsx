import { useState } from "react";
import type { TextInputProps } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { PLACEHOLDER_GRAY } from "../constants/colors";
import Icon from "./Icon";

type InputProps = Omit<TextInputProps, "placeholderTextColor" | "className"> & {
  showPasswordToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  error?: string;
  variant?: "default" | "embed";
};

const inputBaseClass =
  "text-base text-kambista-navy";

export default function Input({
  showPasswordToggle,
  containerClassName = "",
  inputClassName = "",
  error,
  secureTextEntry,
  variant = "default",
  ...rest
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const resolvedSecure =
    showPasswordToggle === true ? !passwordVisible : secureTextEntry;

  const defaultFieldClassName = `min-h-[52px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 ${inputBaseClass} ${inputClassName}`;
  const embedFieldClassName = `mt-0.5 min-h-[32px] w-full flex-1 bg-transparent p-0 text-2xl font-bold text-kambista-navy ${inputClassName}`;

  const textInput = (
    <TextInput
      {...rest}
      className={
        showPasswordToggle
          ? `min-h-[52px] flex-1 px-4 py-3.5 ${inputBaseClass} ${inputClassName}`
          : variant === "embed"
            ? embedFieldClassName
            : defaultFieldClassName
      }
      placeholderTextColor={PLACEHOLDER_GRAY}
      secureTextEntry={resolvedSecure}
    />
  );

  if (showPasswordToggle) {
    return (
      <View className={`w-full ${containerClassName}`}>
        <View className="relative w-full flex-row items-center rounded-xl border border-gray-300 bg-white pr-2">
          {textInput}
          <Pressable
            accessibilityRole="button"
            className="p-2"
            onPress={() => setPasswordVisible((v) => !v)}
          >
            <Icon
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#4B5563"
            />
          </Pressable>
        </View>
        {error ? (
          <Text className="mt-1 text-sm text-red-600">{error}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View className={`w-full ${containerClassName}`}>
      {textInput}
      {error ? (
        <Text className="mt-1 text-sm text-red-600">{error}</Text>
      ) : null}
    </View>
  );
}
