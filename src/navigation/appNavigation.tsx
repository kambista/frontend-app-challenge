import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExchangeScreen from "../screens/Home/ExchangeScreen";
import { BottomTab } from "./bottomNavigation";
import type { AppStackParamList } from "./navigation.types";
import { createStaticNavigation } from "@react-navigation/native";

const AppStack = createNativeStackNavigator<AppStackParamList>({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    BottomTab: BottomTab,
    Exchange: ExchangeScreen,
  },
});

export const AppNavigation = createStaticNavigation(AppStack);
