import React from "react";
import { Text, Pressable, ActivityIndicator } from "react-native";
import { cn } from "../utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  variant?: "filled-primary" | "filled-primary-dark" | "outline-primary-dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  children,
  onPress,
  className,
  textClassName,
  disabled = false,
  variant = "filled-primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon
}: ButtonProps) => {
  const sizeClasses = {
    sm: "py-1.5 px-3",
    md: "py-2.5 px-5",
    lg: "py-4 px-7"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm"
  };

  const variantClasses = {
    "filled-primary": "bg-primary rounded-lg",
    "filled-primary-dark": "bg-primary-dark rounded-lg",
    "outline-primary-dark": "bg-transparent border border-primary-dark"
  };

  const textVariantClasses = {
    "filled-primary": "text-black",
    "filled-primary-dark": "text-white",
    "outline-primary-dark": "text-primary-dark"
  };

  return (
    <Pressable
      onPress={isLoading ? undefined : onPress}
      disabled={disabled || isLoading}
      className={cn(
        "rounded-md justify-center items-center flex-row",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-40" : "",
        isLoading ? "opacity-40" : "",
        className
      )}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1
        }
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "filled-primary" ? "black" : "#00E3C2"}
          className="mr-2"
        />
      ) : leftIcon ? (
        <React.Fragment>
          {leftIcon}
          <Text className="mx-1"></Text>
        </React.Fragment>
      ) : null}

      <Text
        className={cn(
          "font-montserrat-medium text-center",
          textSizeClasses[size],
          textVariantClasses[variant],
          textClassName
        )}
      >
        {children}
      </Text>

      {rightIcon && !isLoading ? (
        <React.Fragment>
          <Text className="mx-1"></Text>
          {rightIcon}
        </React.Fragment>
      ) : null}
    </Pressable>
  );
};

export default Button;
