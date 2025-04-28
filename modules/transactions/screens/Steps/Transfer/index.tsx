import { View, Text } from "react-native";
import React from "react";
import ColumnInfo from "@/modules/transactions/components/ColumnInfo";
import { formatCurrency } from "@/utils/helpers";

interface CompanyInfoProps {
  amountIn: {
    currencySymbol: string;
    amount: number;
  };
}

const CompanyInfo = ({ amountIn }: CompanyInfoProps) => {
  return (
    <View className="flex-col gap-3 border rounded-lg border-gray-30 w-[90%] px-6 py-3">
      <ColumnInfo name="Banco" value="Interbank" />
      <ColumnInfo
        name="Monto"
        value={formatCurrency(amountIn.amount, amountIn.currencySymbol)}
      />
      <ColumnInfo name="Número de cuenta" value="201010000000000" allowCopy />
      <ColumnInfo name="RUC" value="20601708141" allowCopy />
      <ColumnInfo name="Titular de la cuenta" value="Kambista SAC" />
      <ColumnInfo name="Tipo de cuenta" value="Corriente" />
    </View>
  );
};

export default CompanyInfo;
