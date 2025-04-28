import { View, Text } from "react-native";
import React from "react";

interface BulletPointProps {
  children: React.ReactNode;
}

const BulletPoint = ({ children }: BulletPointProps) => {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="h-4 mx-1 leading-tight text-md text-[#666666]">•</Text>
      <Text className="text-sm font-montserrat-medium text-[#666666]">
        {children}
      </Text>
    </View>
  );
};

export default BulletPoint;
