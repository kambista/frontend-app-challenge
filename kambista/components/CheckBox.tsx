import React from 'react';
import { TouchableOpacity, View, Text, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function Checkbox({ label, value, onValueChange }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} className="flex flex-row items-center">
      <View
        className={`w-5 aspect-square rounded-md border border-gray-300 flex justify-center items-center mr-3 ${value ? 'bg-black' : 'bg-white'}`}
      >
        {value && <MaterialIcons name="check" size={12} color="white" />}
      </View>
      <Text className="flex-1 font-mregular text-sm">{label}</Text>
    </TouchableOpacity>
  );
}
