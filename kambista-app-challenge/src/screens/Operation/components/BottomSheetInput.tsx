import { ChevronDown } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import KambistaColors from '../../../utils/colors';

interface FormPickerProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onPress: () => void,
}

export function BottomSheetInput({ value, label, placeholder = "Selecciona", onPress }: FormPickerProps) {
  return (
    <View>
      <View>
        <View className="mb-4 w-full">
          {label && <Text className="text-sm mb-1 text-k-gray-60 font-mont">{label}</Text>}
          <Pressable
            className={`border border-k-gray-25 rounded-lg bg-white py-3 px-4`}
            onPress={() => {
              onPress();
            }}
          >
            <View className='flex-row justify-between items-center gap-2'>
              <Text className={`${value ? "text-black" : "text-k-gray-40"} font-mont`}>
                {value ?? placeholder}
              </Text>
              <ChevronDown color={KambistaColors.gray60} size={24} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
