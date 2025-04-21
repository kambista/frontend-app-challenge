import { View, Text } from "react-native";
import React from "react";
import ColumnInfo from "@/features/Transactions/ColumnInfo";

const CompanyInfo = () => {
  return (
    <View className="flex-col gap-3 border rounded-lg border-gray-30 w-[90%] px-6 py-3">
      <ColumnInfo name="Banco" value="Interbank" />
      <ColumnInfo name="Monto" value="S/ 1,000.00" allowCopy />
      <ColumnInfo name="Número de cuenta" value="201010000000000" allowCopy />
      <ColumnInfo name="RUC" value="20601708141" allowCopy />
      <ColumnInfo name="Titular de la cuenta" value="Kambista SAC" />
      <ColumnInfo name="Tipo de cuenta" value="Corriente" />
    </View>
  );
};

export default CompanyInfo;
