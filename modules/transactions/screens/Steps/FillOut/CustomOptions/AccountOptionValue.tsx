import { OptionProps } from "@/components/CustomSelect";
import { cn } from "@/utils/cn";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AccountData {
  accountNumber?: string;
  currency?: string;
  bankName?: string;
}

const AccountOptionValue = ({
  option,
  onSelect,
  isSelected
}: OptionProps<AccountData>) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option.value, option)}
      className={cn(
        "py-3 px-1 flex-row items-center",
        isSelected ? "bg-blue-50" : ""
      )}
    >
      <View>
        <Text className="text-sm font-montserrat-medium text-primary-dark">
          {[option.label, option?.data?.bankName, option?.data?.currency].join(
            " - "
          )}
        </Text>
        <Text className="text-xs text-gray-60">
          {option?.data?.accountNumber
            ? `******${option.data.accountNumber.slice(-4)}`
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountOptionValue;
