import { Tabs } from "expo-router";
import ExchangeIcon from "@/components/Icons/ExchangeIcon";
import HistoryIcon from "@/components/Icons/HistoryIcon";
import AccountIcon from "@/components/Icons/AccountIcon";
import KoinksIcon from "@/components/Icons/KoinksIcon";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import { Platform, Pressable } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#060F26",
        tabBarInactiveTintColor: "#A7A7A7",
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 70 : 80,
          shadowColor: "none",
          elevation: 0,
          borderColor: "transparent",
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Montserrat-Medium"
        },
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        )
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <ExchangeIcon size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => <HistoryIcon size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Cuentas",
          tabBarIcon: ({ color }) => <AccountIcon size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="koinks"
        options={{
          title: "Koinks",
          tabBarIcon: ({ color }) => <KoinksIcon size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <ProfileIcon size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
