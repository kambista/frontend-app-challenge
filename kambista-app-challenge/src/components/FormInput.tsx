// src/components/FormInput.tsx
import { useState } from 'react';
import { View, TextInput, Text, Pressable, TextInputProps } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Eye, EyeClosed, LucideIcon } from 'lucide-react-native';
import KambistaColors from '../utils/colors';

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: LucideIcon;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

export default function FormInput({
  name,
  control,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;
  const [isFocused, setIsFocused] = useState(false);
  const getBorderByState = (error: FieldError | undefined) => {
    if(error){
      return 'border-warning';
    }
    if(isFocused){
      return 'border-secondary';
    }
    return 'border-k-gray-25'
  }
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <View className="mb-4">
          {label && <Text className="text-sm mb-1 text-k-gray-60 font-mont">{label}</Text>}
          <View className={`flex-row items-center border ${getBorderByState(error)} rounded-md px-4 py-3 bg-white`}>
            <TextInput
              className="flex-1 w-full text-secondary font-mont text-sm"
              placeholder={placeholder}
              secureTextEntry={isPassword && !showPassword}
              keyboardType={keyboardType}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize={autoCapitalize}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={KambistaColors.gray40}
            />
            {isPassword && (
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeClosed size={18} color={KambistaColors.secondary} />
                ) : (
                  <Eye size={18} color={KambistaColors.secondary} />
                )}
              </Pressable>
            )}
          </View>

          {error && (
            <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
