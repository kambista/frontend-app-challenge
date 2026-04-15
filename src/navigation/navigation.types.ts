import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Accounts: undefined;
  Koinks: undefined;
  Profile: undefined;
};

/** Root stack when the user is logged in (`AppNavigation`). */
export type AppStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined;
  Exchange: undefined;
};

/** Used by auth screens for composite navigation typing. */
export type MainStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined;
};
