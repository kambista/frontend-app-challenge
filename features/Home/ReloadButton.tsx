import React from "react";
import { Pressable, View } from "react-native";
import ReloadIcon from "../../components/Icons/ReloadIcon";

const ReloadButton = () => {
  return (
    <View className="absolute z-10 p-4 bg-black/15 rounded-full top-12 right-[5.5rem]">
      <Pressable className="p-2 bg-white rounded-full">
        <ReloadIcon size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default ReloadButton;
