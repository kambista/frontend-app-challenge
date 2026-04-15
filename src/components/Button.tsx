import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type ButtonTone = "mint" | "register" | "cyan" | "cyanNavy" | "navySolid";

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  testID?: string;
  /** When false, button does not stretch to full width (e.g. coupon “APLICAR”). Default true for fill. */
  fullWidth?: boolean;
} & (
  | {
      variant: "fill";
      tone?: ButtonTone;
    }
  | {
      variant: "link";
      tone?: never;
      fullWidth?: boolean;
    }
);

const fillToneClass: Record<ButtonTone, { wrap: string; text: string }> = {
  mint: {
    wrap: "bg-kambista-mint",
    text: "text-gray-700",
  },
  register: {
    wrap: "bg-kambista-registerBtn",
    text: "text-kambista-navy",
  },
  cyan: {
    wrap: "bg-kambista-cyan",
    text: "text-white",
  },
  /** CTA Home: fondo cian, texto navy (mock calculadora). */
  cyanNavy: {
    wrap: "bg-kambista-cyan",
    text: "text-kambista-navy",
  },
  navySolid: {
    wrap: "bg-kambista-navy",
    text: "text-white",
  },
};

export default function Button(props: ButtonProps) {
  const { children, onPress, disabled, className = "", testID } = props;

  if (props.variant === "link") {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        className={`active:opacity-70 ${className}`}
        testID={testID}
      >
        <Text className="text-sm text-gray-500 underline">{children}</Text>
      </Pressable>
    );
  }

  const tone = props.tone ?? "mint";
  const { wrap, text } = fillToneClass[tone];
  const fullWidth = props.fullWidth !== false;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`${fullWidth ? "w-full" : ""} items-center rounded-xl py-4 active:opacity-90 ${wrap} ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      testID={testID}
    >
      <Text
        className={`text-base font-bold uppercase tracking-widest ${text}`}
      >
        {children}
      </Text>
    </Pressable>
  );
}
