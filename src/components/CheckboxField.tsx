import type { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Icon from "./Icon";

type CheckboxVariant = "cyan" | "navy";

type CheckboxFieldProps = {
  checked: boolean;
  onPress: () => void;
  label: ReactNode;
  variant: CheckboxVariant;
  className?: string;
};

const variantBoxClass: Record<CheckboxVariant, { on: string; off: string }> = {
  cyan: {
    on: "border-kambista-cyan bg-kambista-cyan",
    off: "border-gray-400 bg-white",
  },
  navy: {
    on: "border-kambista-navy bg-kambista-navy",
    off: "border-gray-400 bg-white",
  },
};

export default function CheckboxField({
  checked,
  onPress,
  label,
  variant,
  className = "",
}: CheckboxFieldProps) {
  const box = variantBoxClass[variant];
  const boxClasses = checked ? box.on : box.off;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className={`flex-row gap-3 ${className}`}
      onPress={onPress}
    >
      <View
        className={`mt-0.5 h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${boxClasses}`}
      >
        {checked ? (
          <Icon name="checkmark" size={14} color="#FFFFFF" />
        ) : null}
      </View>
      {label}
    </Pressable>
  );
}
