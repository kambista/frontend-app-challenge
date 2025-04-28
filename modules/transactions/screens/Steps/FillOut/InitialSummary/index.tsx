import Divider from "@/components/Divider";
import React from "react";
import { View } from "react-native";
import RowInfo from "./Row";

interface InitialSummaryProps {
  sendAmount: {
    amount: number;
    currencySymbol: string;
  };
  receiveAmount: {
    amount: number;
    currencySymbol: string;
  };
  coupon: string;
  exchangeRate: number;
  discountRate: number;
}

const InitialSummary = ({
  sendAmount,
  receiveAmount,
  coupon,
  exchangeRate,
  discountRate
}: InitialSummaryProps) => {
  return (
    <View className="flex-col gap-2 px-6 py-3 bg-white rounded-lg">
      <RowInfo
        name="Tú envías"
        value={`${sendAmount?.currencySymbol} ${sendAmount.amount.toFixed(2)}`}
      />
      <RowInfo
        name="Tú recibes"
        value={`${receiveAmount?.currencySymbol} ${receiveAmount.amount.toFixed(2)}`}
      />
      {coupon && <RowInfo name="Cupón aplicado" value={coupon} />}
      <Divider thickness={1} className="bg-gray-60" />
      <RowInfo
        name="Tipo de cambio utilizado"
        value={exchangeRate.toString()}
        discount={coupon ? discountRate : undefined}
      />
    </View>
  );
};

export default InitialSummary;
