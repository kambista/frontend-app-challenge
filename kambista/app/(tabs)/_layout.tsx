import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Octicons } from '@expo/vector-icons';
import BottomTabBar from '@/components/bottom-tabbar/BottomTabBar';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/authStore';

interface TabIconProps {
  icon: any;
  focused: any;
}

const TabIcon = ({ icon, focused }: TabIconProps) => {
  return <Octicons name={icon} size={22} color={focused ? 'black' : '#737373'} />;
};

export default function TabLayout() {
  const { isLoggedIn } = useAuthStore();

  // Todo el Tab está protegido
  // if (!isLoggedIn) {
  //   return <Redirect href={'/sign-in'} />;
  // }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#737373',
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Inicio',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon icon={'home'} {...props} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Historial',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon icon={'calendar'} {...props} />,
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: 'Cuentas',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon icon={'person'} {...props} />,
          }}
        />
        <Tabs.Screen
          name="koinks"
          options={{
            title: 'Koinks',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon icon={'person'} {...props} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            headerShown: false,
            tabBarIcon: (props) => <TabIcon icon={'person'} {...props} />,
          }}
        />
      </Tabs>

      {/* BARRA DE ESTADO */}
      <StatusBar backgroundColor="#f7f7ff" style="dark" />
    </>
  );
}

