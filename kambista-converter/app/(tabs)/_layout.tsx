import { Tabs } from 'expo-router';
import { HomeIcon } from '../../components/icons/HomeIcon';
import { PersonIcon } from '../../components/icons/PersonIcon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#F6F6F9' },
        tabBarStyle: { backgroundColor: '#FFFFFF' },
        tabBarActiveTintColor: '#060F26',
        tabBarInactiveTintColor: '#8891A5',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <PersonIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tabs.Screen name="transactions" options={{ href: null }} />
    </Tabs>
  );
}
