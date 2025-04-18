import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Octicons } from '@expo/vector-icons';

type Props = {
  title?: string;
  rightElement?: React.ReactNode;
  otherStyles?: string;
  onBackPress?: () => void;
};

export default function Header({ title, rightElement, otherStyles, onBackPress }: Props) {
  return (
    <View className={`flex flex-row items-center relative ${otherStyles}`}>
      <View className="mr-auto">
        <TouchableOpacity
          className="rounded-full w-12 h-12  flex justify-center items-center"
          onPress={() => {
            if (onBackPress) {
              onBackPress();
            }
            router.back();
          }}
        >
          <Octicons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 absolute left-1/2 -translate-x-1/2">
        <Text className="text-base font-mbold">{title ? title : ''}</Text>
      </View>
      <View className="mr-auto h-12">{rightElement}</View>
    </View>
  );
}
