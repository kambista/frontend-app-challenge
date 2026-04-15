import type { ReactNode } from "react";
import { Text } from "react-native";

type FieldLabelProps = {
  children: ReactNode;
  className?: string;
  optional?: boolean;
};

export default function FieldLabel({
  children,
  className = "",
  optional,
}: FieldLabelProps) {
  return (
    <Text className={`mb-2 text-sm text-gray-500 ${className}`}>
      {children}
      {optional ? " (Opcional)" : null}
    </Text>
  );
}
