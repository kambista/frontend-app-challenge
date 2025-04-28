import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  disabled?: boolean | undefined;
  variant?: 'primary' | 'secondary';
}

export default function KButton({
  title,
  onPress,
  icon,
  disabled = false,
  variant = 'primary',
}: CustomButtonProps) {
  const baseStyles = 'flex-row items-center justify-center rounded-xl px-4 py-4';
  const textStyles = 'text-black text-sm font-mont';
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary'
      : 'bg-gray-200 text-gray-800';

  const disabledStyles = disabled
    ? 'opacity-50'
    : 'active:opacity-80';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles}`}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={textStyles}>{title.toUpperCase()}</Text>
    </Pressable>
  );
}
