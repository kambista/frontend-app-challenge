import { View, Text, Image } from "react-native";
import React from "react";
import { cn } from "@/utils/cn";
import { SingleValueProps } from "@/components/CustomSelect";

interface BankData {
  imageSrc?: string;
}

const BankSingleValue = ({
  selectedOption,
  placeholder,
}: SingleValueProps<BankData>) => {
  return (
    <View className="flex-row items-center justify-start gap-2">
      {selectedOption?.data?.imageSrc && (
        <Image
          source={{ uri: selectedOption.data.imageSrc }}
          className="w-6 h-6 rounded-md"
          style={{ resizeMode: "cover" }}
        />
      )}

      <Text
        className={cn(
          "font-montserrat-medium leading-relaxed",
          selectedOption ? "text-gray-60" : "text-gray-40"
        )}
      >
        {selectedOption?.label || placeholder}
      </Text>
    </View>
  );
};

export default BankSingleValue;
