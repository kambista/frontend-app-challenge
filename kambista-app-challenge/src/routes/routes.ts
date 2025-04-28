import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import { Paths } from "./paths";
import { OperationScreen } from "../screens/Operation/OperationScreen";
import { OperationFinish } from "../screens/Operation/OperationFinish";
import { EmptyView } from "../screens/Empty/EmptyView";
import { Image } from "react-native";
import calcIcon from "../../assets/k_exchange.png"
export const MainRoutes = [
  {
    path: Paths.login,
    name: 'Inicio de Sesión',
    title: 'Login',
    component: LoginScreen,
  },
  {
    path: Paths.onboarding,
    name: 'Inicio de Sesión',
    title: 'Login',
    component: LoginScreen,
  },
  {
    path: Paths.onboardingFinish,
    name: 'Inicio de Sesión',
    title: 'Login',
    component: LoginScreen,
  },
  {
    path: Paths.app,
    name: 'Inicio de Sesión',
    title: 'Login',
    component: LoginScreen,
  },
];

export interface RouteProps {
  path: string;
  name: string;
  title: string;
  component: React.ComponentType<any>;
  options?: BottomTabNavigationOptions;
  subRoutes?: Array<RouteProps>;
}

export const TabRoutes: RouteProps[] = [
  {
    path: Paths.home,
    name: 'Home',
    title: 'home',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
    subRoutes: [
      {
        path: Paths.calculator,
        name: 'Home',
        options: {headerShown: false},
        title: 'Home',
        component: HomeScreen,
      },
      {
        path: Paths.operation,
        name: 'Completa tus datos',
        options: {
          headerShown: true, title: 'Completa tus datos', headerTitleAlign: 'center', 
            headerTitleStyle: {
            fontSize: 16,
            fontFamily: 'Montserrat_400Regular', // si quieres fuente personalizada
          }, 
        },
        title: 'Completa tus datos',
        component: OperationScreen,
      },
      {
        path: Paths.operationFinish,
        name: 'Completa tus datos',
        options: {headerShown: false, title: 'Completa tus datos'},
        title: 'Completa tus datos',
        component: OperationFinish,
      }
    ]
  },
  {
    path: Paths.history,
    name: 'Home',
    title: 'home',
    component: HomeScreen,
    options: {headerShown: false},
    subRoutes: [
      {
        path: Paths.history,
        name: 'Home',
        options: {headerShown: false},
        title: 'Home',
        component: EmptyView,
      },
    ]
  },
  {
    path: Paths.accounts,
    name: 'Home',
    title: 'home',
    component: HomeScreen,
    options: {headerShown: false},
    subRoutes: [
      {
        path: Paths.accounts,
        name: 'Home',
        options: {headerShown: false},
        title: 'Home',
        component: EmptyView,
      },
    ]
  },
  {
    path: Paths.koinks,
    name: 'Home',
    title: 'home',
    component: HomeScreen,
    options: {headerShown: false},
    subRoutes: [
      {
        path: Paths.koinks,
        name: 'Home',
        options: {headerShown: false},
        title: 'Home',
        component: EmptyView,
      },
    ]
  },
  {
    path: Paths.profile,
    name: 'Home',
    title: 'home',
    component: HomeScreen,
    options: {headerShown: false},
    subRoutes: [
      {
        path: Paths.profile,
        name: 'Home',
        options: {headerShown: false},
        title: 'Home',
        component: EmptyView,
      },
    ]
  }
]

export const getTabBarIcon = (path: string) => {
  switch (path) {
    case Paths.home:
      return require('../../assets/k_exchange.png');
    case Paths.history:
      return require('../../assets/k_RecordDocument.png');
    case Paths.accounts:
      return require('../../assets/k_CreditCard.png');
    case Paths.koinks:
      return require('../../assets/K_iconopuntos.png');
    case Paths.profile:
      return require('../../assets/K_Person.png');
    default:
      return require('../../assets/k_exchange.png');
  }
};