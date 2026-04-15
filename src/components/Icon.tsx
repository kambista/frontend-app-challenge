import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Ionicons>["name"];

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: ComponentProps<typeof Ionicons>["style"];
};

export default function Icon({ name, size = 24, color, style }: IconProps) {
  return <Ionicons name={name} size={size} color={color} style={style} />;
}
