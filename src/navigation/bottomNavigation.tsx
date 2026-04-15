import AccountsScreen from "../screens/Accounts/AccountsScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import KoinksScreen from "../screens/Koinks/KoinksScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { BottomTabParamList } from "./navigation.types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/Icon";

export const BottomTab = createBottomTabNavigator<BottomTabParamList>({
    initialRouteName: "Home",
    screenOptions: {
        headerShown: false,
        tabBarActiveTintColor: "#1a1a2e",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5EA",
            borderTopWidth: 1,
        },
        tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
        },
    },
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                tabBarLabel: "Inicio",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" color={color} size={size} />
                ),
            },
        },
        History: {
            screen: HistoryScreen,
            options: {
                tabBarLabel: "Historial",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="document-text-outline" color={color} size={size} />
                ),
            },
        },
        Accounts: {
            screen: AccountsScreen,
            options: {
                tabBarLabel: "Cuentas",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="card-outline" color={color} size={size} />
                ),
            },
        },
        Koinks: {
            screen: KoinksScreen,
            options: {
                tabBarLabel: "Koinks",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="ellipse-outline" color={color} size={size} />
                ),
            },
        },
        Profile: {
            screen: ProfileScreen,
            options: {
                tabBarLabel: "Perfil",
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person-outline" color={color} size={size} />
                ),
            },
        },
    },
});