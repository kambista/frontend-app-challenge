import { Pressable, Text } from "react-native";
import Icon from "./Icon";

type SelectVariant = "compact" | "full";

type SelectFieldProps = {
  value?: string;
  placeholder: string;
  onPress: () => void;
  variant?: SelectVariant;
  disabled?: boolean;
  className?: string;
};

const variantClass: Record<SelectVariant, string> = {
  compact:
    "h-[52px] w-28 shrink-0 flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-2.5 py-3",
  full: "min-h-[52px] w-full flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3.5",
};

const valueTextClass: Record<SelectVariant, string> = {
  compact: "text-sm font-medium text-kambista-navy",
  full: "text-base text-kambista-navy",
};

export default function SelectField({
  value,
  placeholder,
  onPress,
  variant = "full",
  disabled,
  className = "",
}: SelectFieldProps) {
  const hasValue = Boolean(value && value.trim().length > 0);
  const display = hasValue ? value!.trim() : placeholder;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`${variantClass[variant]} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <Text
        className={
          hasValue
            ? valueTextClass[variant]
            : variant === "compact"
              ? "text-sm text-gray-400"
              : "text-base text-gray-400"
        }
        numberOfLines={1}
      >
        {display}
      </Text>
      <Icon name="chevron-down" size={variant === "compact" ? 16 : 18} color="#6B7280" />
    </Pressable>
  );
}
