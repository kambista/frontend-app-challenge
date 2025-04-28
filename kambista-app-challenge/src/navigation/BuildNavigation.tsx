import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Paths } from '../routes/paths';
import LoginScreen from '../screens/Login/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getTabBarIcon, RouteProps, TabRoutes } from '../routes/routes';
import { OnboardingFinish } from '../screens/Onboarding/OnboardingFinish';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { Image } from 'react-native';
import calcIcon from "../../assets/k_exchange.png";
import { Calculator } from 'lucide-react-native';
import KambistaColors from '../utils/colors';

interface StackNavProps {
  subRoutes?: Array<RouteProps>
}

export type StackNavParamList = {
  [Paths.operation]: undefined;
  [Paths.home]: undefined;
};


function BuildStackNavigator({subRoutes}: StackNavProps){
  const Stack = createNativeStackNavigator<StackNavParamList>();
  return (
    <Stack.Navigator>
      {subRoutes?.map((subR, index) => (
        <Stack.Screen
          name={subR.path}
          key={`${index} route`}
          options={subR.options as NativeStackNavigationOptions}
          component={subR.component}
        />
      ))}
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName={Paths.home}>
      {
        TabRoutes.map((e) => (
          <Tab.Screen
            name={e.path}
            key={e.path}
            
            options={{
              headerShown:false,
              tabBarActiveTintColor: KambistaColors.secondary,    // Color del icono y texto cuando está activo
              tabBarInactiveTintColor: KambistaColors.gray40,  // Color del icono y texto cuando NO está activo
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Montserrat_400Regular', // si quieres fuente personalizada
              },
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={getTabBarIcon(e.path)}
                  style={{ width: 16, height: 16, tintColor: color }}
                />
              ),
            }}
            component={() => <BuildStackNavigator subRoutes={e.subRoutes} />}
          >
          </Tab.Screen>
        ))
      }
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  [Paths.login]: undefined;
  [Paths.onboarding]: undefined;
  [Paths.onboardingFinish]: undefined;
  [Paths.app]: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function BuildNavigation(){
  return(
    <Stack.Navigator initialRouteName={Paths.login}>
      <Stack.Screen name={Paths.login} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Paths.onboarding} component={OnboardingScreen} 
        options={{title: 'Completa tus datos', headerTitleAlign: 'center',  headerTitleStyle: {
          fontSize: 12,
          fontFamily: 'Montserrat_400Regular', // si quieres fuente personalizada
        }, }} />
      <Stack.Screen name={Paths.onboardingFinish} component={OnboardingFinish} options={{ headerShown: false }} />
      <Stack.Screen name={Paths.app} component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}