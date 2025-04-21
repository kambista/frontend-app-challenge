import { cn } from "@/utils/cn";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CouponInput = () => {
  return (
    <View
      className="flex-row items-center justify-center gap-0 bg-white h-14 rounded-xl shadow-coupon"
      style={Platform.OS === "android" ? styles.containerShadow : {}}
    >
      <TextInput
        className={cn(
          "flex-1 h-full px-5 py-0 text-sm bg-white border border-r-transparent font-montserrat-regular text-primary-dark border-t-gray-30 border-l-gray-30 border-b-gray-30 rounded-l-xl",
          Platform.OS === "ios" ? "leading-tight" : "",
        )}
        placeholder="Ingresa el cupón"
        placeholderTextColor="#A0AEC0"
        underlineColorAndroid="transparent"
        textAlign="center"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable
        className="flex items-center justify-center h-full px-3 w-28 rounded-r-xl bg-primary-dark font-montserrat-black"
        onPress={() => {}}
      >
        <Text className="text-sm text-white font-montserrat-semibold">
          APLICAR
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
  },
});

export default CouponInput;
