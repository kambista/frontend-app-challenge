import ExchangeForm from "@/modules/home/components/ExchangeForm";
import { useGetCurrentExchange } from "@/modules/home/hooks/useGetCurrentExchange";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const GetCurrentExchange = useGetCurrentExchange();

  React.useEffect(() => {
    GetCurrentExchange.handle();
  }, []);

  return (
    <ScrollView
      className="h-full bg-gray-10"
      contentContainerClassName="my-auto p-6 bg-gray-10"
    >
      <Image
        source={require("@/assets/images/logo.png")}
        className="object-contain w-40 h-8 mx-auto mb-14"
      />

      <ExchangeForm
        router={router}
        currentExchange={{
          ask: GetCurrentExchange.data?.ask || 0,
          bid: GetCurrentExchange.data?.bid || 0
        }}
      />
    </ScrollView>
  );
}
