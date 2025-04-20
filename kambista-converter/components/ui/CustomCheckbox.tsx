import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const CustomCheckbox = ({ label, checked, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center"
      activeOpacity={0.8}
    >
      <View
        className={`w-5 h-5 rounded border mr-2 items-center justify-center ${
          checked ? 'bg-primary border-primary' : 'border-gray-40'
        }`}
      >
        {checked && <View className="w-3 h-3 bg-white rounded-sm" />}
      </View>
      <Text className="text-gray-60" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});
