import React, { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import BottomTabButton from './BottomTabButton';
import useUI from '@/hooks/useUI';
import { useKeyboard } from '@react-native-community/hooks';

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { isTabBarVisible } = useUI();
  const keyboard = useKeyboard();

  if (!isTabBarVisible) return null;

  return (
    <View
      className={`flex flex-row justify-between items-center bg-white pb-4 ${keyboard.keyboardShown ? 'hidden' : ''}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const { options } = descriptors[route.key];

        const activeColor = options.tabBarActiveTintColor || 'black';
        const inactiveColor = options.tabBarInactiveTintColor || '#737373';

        const label = options.title ?? route.name;
        const isFocused = state.index === index;
        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? activeColor : inactiveColor,
        });

        return (
          <BottomTabButton
            key={route.name}
            label={label}
            isFocused={isFocused}
            color={isFocused ? activeColor : inactiveColor}
            navigation={navigation}
            route={route}
            icon={icon}
          />
        );
      })}
    </View>
  );
};

export default BottomTabBar;
