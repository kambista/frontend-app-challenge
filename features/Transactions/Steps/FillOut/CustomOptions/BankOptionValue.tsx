import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { cn } from "@/utils/cn";
import { OptionProps } from "@/components/CustomSelect";

interface BankData {
  imageSrc?: string;
}

const BankOptionValue = ({
  option,
  onSelect,
  isSelected,
}: OptionProps<BankData>) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option.value, option)}
      className={cn(
        "py-3 px-1 flex-row items-center",
        isSelected ? "bg-blue-50" : ""
      )}
    >
      {option.data?.imageSrc && (
        <Image
          source={{ uri: option.data.imageSrc }}
          className="w-8 h-8 rounded-md"
          style={{ resizeMode: "cover" }}
        />
      )}
      <View className="ml-3">
        <Text className="font-montserrat-medium">{option.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BankOptionValue;
