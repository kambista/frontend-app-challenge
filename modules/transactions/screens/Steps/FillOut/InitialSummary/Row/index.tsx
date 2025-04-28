import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/utils/cn";

interface RowInfoProps {
  name: string;
  value: string;
  currencySymbol?: string;
  discount?: number;
}

const RowInfo = ({ name, value, currencySymbol, discount }: RowInfoProps) => {
  const rowStyles = {
    default: {
      name: "font-montserrat-regular text-sm",
      value: "font-montserrat-bold text-sm"
    },
    discount: {
      name: "font-montserrat-bold text-xs",
      value: "font-montserrat-bold text-xs"
    }
  };

  return (
    <View className="flex-row items-center justify-between">
      <Text
        className={cn(
          "text-primary-dark",
          discount ? rowStyles.discount.name : rowStyles.default.name
        )}
      >
        {name}
      </Text>
      <Text
        className={cn(
          "text-primary-dark",
          discount ? rowStyles.discount.value : rowStyles.default.value
        )}
      >
        <Text
          className={cn(
            "text-xs  font-montserrat-bold",
            discount ? "text-red-500 line-through" : "text-primary-dark"
          )}
        >
          {`${currencySymbol ? currencySymbol + " " : ""}${value}`}
        </Text>{" "}
        {discount && (
          <Text className="text-xs text-primary-dark font-montserrat-bold">
            {discount.toFixed(3)}
          </Text>
        )}
      </Text>
    </View>
  );
};

export default RowInfo;
