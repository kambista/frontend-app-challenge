import ClipboardIcon from "@/components/Icons/ClipboardIcon";
import { cn } from "@/utils/cn";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Text, View } from "react-native";

interface ColumnInfoProps {
  name: string;
  value: string;
  allowCopy?: boolean;
  variant?: "sm" | "md";
}

const ColumnInfo = ({
  name,
  value,
  allowCopy,
  variant = "sm"
}: ColumnInfoProps) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
    alert("Copiado al portapapeles");
  };

  const textVariant = {
    sm: {
      name: "text-xs",
      value: "text-sm"
    },
    md: {
      name: "text-sm",
      value: "text-base"
    }
  };

  return (
    <View className="flex-col gap-1">
      <Text
        className={cn(
          "text-gray-60 font-montserrat-bold",
          textVariant[variant].name
        )}
      >
        {name}
      </Text>
      <View className="flex-row items-center gap-3">
        <Text
          className={cn(
            "pl-2 text-primary-dark font-montserrat-bold",
            textVariant[variant].value
          )}
        >
          {value}
        </Text>
        {allowCopy && (
          <View
            className="text-sm underline text-primary-dark font-montserrat-regular"
            onTouchEnd={handleCopy}
          >
            <ClipboardIcon size={16} color="#686868" />
          </View>
        )}
      </View>
    </View>
  );
};

export default ColumnInfo;
