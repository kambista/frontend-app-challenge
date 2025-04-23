import { Octicons } from '@expo/vector-icons';
import React, { Text, View } from 'react-native';
import { ToastShowParams } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: ToastShowParams) => (
    <View
      className="bg-white rounded-xl flex flex-row w-full px-5 py-3 w-[90vw] h-auto"
      style={{ boxShadow: '0px 6px 12px -2px rgba(0, 0, 0, 0.15)' }}
    >
      <View className="bg-black rounded-full aspect-square flex items-center justify-center h-8 self-center">
        <Octicons name="check" color="white" size={18} />
      </View>
      <View className="flex-1 pl-4 self-center">
        <Text className="font-mbold">{props.text1}</Text>
        <Text className="font-mmedium">{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props: ToastShowParams) => (
    <View
      className="bg-white rounded-xl flex flex-row w-full px-5 py-3 w-[90vw] h-auto"
      style={{ boxShadow: '0px 6px 12px -2px rgba(0, 0, 0, 0.15)' }}
    >
      <View className="bg-black rounded-full aspect-square flex items-center justify-center h-8 self-center">
        <Octicons name="x" color="white" size={18} />
      </View>
      <View className="flex-1 pl-4 self-center">
        <Text className="font-mbold">{props.text1}</Text>
        <Text className="font-mmedium">{props.text2}</Text>
      </View>
    </View>
  ),
  info: (props: ToastShowParams) => (
    <View
      className="bg-white rounded-xl flex flex-row w-full px-5 py-3 w-[90vw] h-auto"
      style={{ boxShadow: '0px 6px 12px -2px rgba(0, 0, 0, 0.15)' }}
    >
      <View className="bg-black rounded-full aspect-square flex items-center justify-center h-8 self-center">
        <Octicons name="info" color="white" size={18} />
      </View>
      <View className="flex-1 pl-4 self-center">
        <Text className="font-mbold">{props.text1}</Text>
        <Text className="font-mmedium">{props.text2}</Text>
      </View>
    </View>
  ),
};
