import { View, Text } from "react-native";
import React from "react";
import RowInfo from "./Row";
import Divider from "@/components/Divider";

const InitialSummary = () => {
  return (
    <View className="flex-col gap-2 px-6 py-3 bg-white rounded-lg">
      <RowInfo name="Tú envías" value="$ 100.00" />
      <RowInfo name="Tú recibes" value="S/ 343.00" />
      <RowInfo name="Cupón aplicado" value="MICASA21" />
      <Divider thickness={1} className="bg-gray-60" />
      <RowInfo name="Tipo de cambio utilizado" value="3.433" discount={3.422} />
    </View>
  );
};

export default InitialSummary;
