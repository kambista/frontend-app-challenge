import { View, Text, TextInput } from "react-native";
import React from "react";

interface CurrencyInputProps {
  value: number | string;
  label: string;
  currencyLabel: string;
  onChange: (value: number | string) => void;
}

const CurrencyInput = ({
  value,
  label,
  currencyLabel,
  onChange
}: CurrencyInputProps) => {
  const handleChange = (text: string) => {
    const sanitizedText = text.replace(/[^0-9.]/g, "");
    const hasMultipleDots = (sanitizedText.match(/\./g) || []).length > 1;
    if (!hasMultipleDots) {
      onChange(sanitizedText);
    } else {
      onChange(sanitizedText.slice(0, sanitizedText.lastIndexOf(".")));
    }
  };

  return (
    <View className="flex-row items-center justify-center h-20 rounded-lg bg-gray-25">
      <View className="flex-col justify-start flex-1 px-5">
        <Text className="text-sm font-montserrat-medium text-primary-dark">
          {label}
        </Text>
        <TextInput
          className="w-full py-0 text-xl border border-transparent rounded-lg font-montserrat-bold text-primary-dark"
          keyboardType="numeric"
          textAlignVertical="bottom"
          placeholderTextColor="#A0AEC0"
          selectionColor="#A0AEC0"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onChangeText={handleChange}
          value={value.toString()}
        />
      </View>
      <View className="flex items-center justify-center w-32 h-full px-3 rounded-r-lg bg-primary-dark font-montserrat-black">
        <Text className="text-2xl text-white font-montserrat-black">
          {currencyLabel}
        </Text>
      </View>
    </View>
  );
};

export default CurrencyInput;
