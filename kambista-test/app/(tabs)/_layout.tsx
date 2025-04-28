import { Tabs } from 'expo-router';
import { User } from 'lucide-react-native';
import { useAuthStore } from '../../src/features/auth/store/auth';
import { StartIcon } from '../../src/features/common/icons/start-icon';
import { CreditCardIcon } from '../../src/features/common/icons/credit-card';
import { HistoryIcon } from '../../src/features/common/icons/history';
import { KkoinIcon } from '../../src/features/common/icons/kkoins';

export default function TabLayout() {

    const { user } = useAuthStore();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false, // Ocultar etiquetas si solo quieres íconos
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // <-- semitransparente
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                },
            }}

        >
            <Tabs.Screen name="home"
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    // tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                    tabBarIcon: ({ focused }) => <StartIcon isFocused={focused} color="#000000" />,
                    tabBarLabel: "Inicio"
                }}
            />
            <Tabs.Screen name="account"
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }) => <CreditCardIcon isFocused={focused} color="#000000" />,
                    tabBarLabel: "Cuentas"
                }}
            />
            <Tabs.Screen name="history"
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }) => <HistoryIcon isFocused={focused} color="#000000" />,
                    tabBarLabel: "Historial"
                }}
            />
            <Tabs.Screen name="koinks"
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }) => <KkoinIcon isFocused={focused} color="#000000" />,
                    tabBarLabel: "koinks"
                }}
            />

            <Tabs.Screen name="profile"
                options={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                    tabBarLabel: "Perfil"
                }}
            />
        </Tabs>
    );
}